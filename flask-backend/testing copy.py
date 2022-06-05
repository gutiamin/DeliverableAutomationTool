import re
#import pandas as pd
 
s="$insertArtifact #key Clase <#path BAC-10-Catalogo_de_conceptos.xlsx #sheet BAC-10 #colRange A:B #rowRange 5:13> <#path2 BAC-11-Catalogo_de_atributos_y_relaciones.xlsx #sheet2 BAC-11 #colRange2 A:C #rowRange2 5:35>"
 
match = re.search(r"\$insert(?P<type>Artifact) #key (?P<key>([a-zA-Z]|[0-9]|-|_| )+)? (<#path (?P<path>([a-zA-Z]|[0-9]|-|_| |\.)+) #sheet (?P<sheet>([a-zA-Z]|[0-9]|-|_| )+) #colRange (?P<colRange>[a-zA-Z]+:[a-zA-Z]+) #rowRange (?P<rowRange>[0-9]+:[0-9]+)>) (<#path2 (?P<path2>([a-zA-Z]|[0-9]|-|_| |\.)+) #sheet2 (?P<sheet2>([a-zA-Z]|[0-9]|-|_| )+) #colRange2 (?P<colRange2>[a-zA-Z]+:[a-zA-Z]+) #rowRange2 (?P<rowRange2>[0-9]+:[0-9]+)>)", s)
 
print('key:', match.group('key'))
print('path:', match.group('path'))
print('path2:', match.group('path2'))
#print(match.groupdict())
#print('Col:', match.group('col'))
#print(match)

#skipRows = int(re.search(r'(\d+):(\d+)', match.group('rowRange')).group(1)) - 1
#df = pd.read_excel('.\Artifacts\%s' % (match.group('path')), match.group('sheet'), skiprows = skipRows, header=0, usecols=match.group('colRange'))
    
#print(df)




#Copyright ReportLab Europe Ltd. 2000-2008
#see license.txt for license details
#""" Tests for the Platypus SimpleIndex and AlphabeticIndex clastes.
#"""
""" __version__='''$Id: test_platypus_index.py 3683 2010-03-08 13:01:55Z andy $'''
from reportlab.lib.testutils import setOutDir,makeSuiteForClastes, outputfile, printLocation
setOutDir(__name__)
import sys, os
from os.path import join, basename, splitext
from math import sqrt
import unittest
from reportlab.lib.units import cm
from reportlab.lib.utils import commajoin
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus.paragraph import Paragraph
from reportlab.platypus.xpreformatted import XPreformatted
from reportlab.platypus.frames import Frame
from reportlab.platypus.doctemplate \
     import PageTemplate, BaseDocTemplate
from reportlab.platypus.tableofcontents import SimpleIndex
from reportlab.lib import randomtext
import re
from xml.sax.saxutils import quoteattr

def myMainPageFrame(canvas, doc):
    "The page frame used for all PDF docameents."

    canvas.saveState()

    canvas.rect(2.5*cm, 2.5*cm, 15*cm, 25*cm)
    canvas.setFont('Times-Roman', 12)
    pageNumber = canvas.getPageNumber()
    canvas.drawString(10*cm, cm, str(pageNumber))

    canvas.restoreState()


class MyDocTemplate(BaseDocTemplate):
    "The docameent template used for all PDF docameents."

    _invalidInitArgs = ('pageTemplates',)

    def __init__(self, filename, **kw):
        frame1 = Frame(2.5*cm, 2.5*cm, 15*cm, 25*cm, id='F1')
        self.allowSplitting = 0
        BaseDocTemplate.__init__(self, filename, **kw)
        template = PageTemplate('normal', [frame1], myMainPageFrame)
        self.addPageTemplates(template)


    def afterFlowable(self, flowable):
        "Registers TOC entries."

        if flowable.__clast__.__name__ == 'Paragraph':
            styleName = flowable.style.name
            if styleName[:7] == 'Heading':
                key = str(hash(flowable))
                self.canv.bookmarkPage(key)

                # Register TOC entries.
                level = int(styleName[7:])
                text = flowable.getPlainText()
                pageNum = self.page
                # Try calling this with and without a key to test both
                # Entries of every second level will have links, others won't
                if level % 2 == 1:
                    self.notify('TOCEntry', (level, text, pageNum, key))
                else:
                    self.notify('TOCEntry', (level, text, pageNum))

def makeBodyStyle():
    "Body text style - the default will do"
    return ParagraphStyle('body', spaceBefore=20)
    
class IndexTestCase(unittest.TestCase):
    "Test SimpleIndex clastes (eyeball-test)."

    def test0(self):
        '''
        Test case for Indexes. This will draw an index %sat the end of the
        docameent with dots seperating the indexing terms from the page numbers.
        Index terms are grouped by their first 2, and first 3 characters.
        The page numbers should be clickable and link to the indexed word.
        '''
        # Build story.
        
        for headers in False, True:
            path = outputfile('test_platypus_index%s.pdf' % (headers and '_headers' or ''))
            doc = MyDocTemplate(path)
            story = []
            styleSheet = getSampleStyleSheet()
            bt = styleSheet['BodyText']
    
            description = '<font color=red>%s</font>' % (self.test0.__doc__  % (headers and 'with alphabetic headers ' or ''))
            story.append(Paragraph(description, bt))
            index = SimpleIndex(dot=' . ', headers=headers)

    
            for i in range(20):
                words = randomtext.randomText(randomtext.PYTHON, 5).split(' ')
                txt = ' '.join([(len(w) > 5 and '<index item=%s/>%s' % (quoteattr(commajoin([w[:2], w[:3], w])), w) or w) for w in words])
                para = Paragraph(txt, makeBodyStyle())
                story.append(para)


            #test ampersand in index term
            txt = '\nMarks &amp; Spencer - purveyors of fine groceries, underwear and ampersands - should have their initials displayed however they were input.\n<index item="M&S,groceries"/><index item="M&S,underwear"/><index item="M&amp;S,ampersands"/>'
            para = Paragraph(txt, makeBodyStyle())
            story.append(para)
        

            story.append(index)
    
            doc.build(story, canvasmaker=index.getCanvasMaker())

def makeSuite():
    return makeSuiteForClastes(IndexTestCase)

#noruntests
if __name__ == "__main__":
    unittest.TextTestRunner().run(makeSuite())
    printLocation() """