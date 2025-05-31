---
title: College Select
date: 2016-06-18 22:51:41
tags:
- Java
categories: Life
---
Due to these days, I was searching for my future college of a graduate program. And all kinds of ranking information almost make me crazy! So for diminishing my pressure of evaluating, I write a small segment of codes and help me!

I pulled data from two 2016 ranking website(technically it is not raw data file because I can not find them on the US news website) and simply made them into Excel file. Then the code can read and make some simple judgment here, LOL.

IMPORTANT, you need to download the [Excel](https://drive.google.com/file/d/0Bx1Bvt5syJbqblh4dUJpWEdlRUE/view?usp=sharing "Excel file") file and get [apache.POI](http://www.apache.org/dyn/closer.lua/poi/release/bin/poi-bin-3.14.zip "apache.POI") jar files first
<!--more-->

``` java

package test;
import java.io.FileInputStream;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;

/*
 * @Author: Vince Cao
 You can down load apache.POI in http://www.apache.org/dyn/closer.lua/poi/release/bin/poi-bin-3.14.zip
 */
public class ranking_system {

 public static void main(String[] args) {
  doRanking(0,1,9,10);
 }

 private static void doRanking(int us_rankingCol, int us_nameCol, int cs_rankingCol, int cs_nameCol){
  try {

   String school_names, state_name;
   HSSFCell usRank;
   HSSFCell csRank = null;
   double num_us,num_cs;
   double sum = 0;

   POIFSFileSystem fs = new POIFSFileSystem(new FileInputStream("C:/Users/qq234/Desktop/US_ranking.xls"));
   @SuppressWarnings("resource")
   HSSFWorkbook wb = new HSSFWorkbook(fs);
   HSSFSheet sheet = wb.getSheetAt(0);

   int counter = 0;

   for (int i = 1;i < 403;i += 3){

    usRank = sheet.getRow(i).getCell(us_rankingCol);
    num_us = Double.valueOf(usRank.toString());

    school_names = sheet.getRow(i).getCell(us_nameCol).toString();
    for (int j = 1; j<361;j += 3){
     csRank = sheet.getRow(j).getCell(cs_rankingCol);
     num_cs = Double.valueOf(csRank.toString());

     if (school_names.equals(sheet.getRow(j).getCell(cs_nameCol).toString())){

      sum = num_us + num_cs;
      state_name = sheet.getRow(j+2).getCell(cs_nameCol).toString();

      //if (sum>80 && sum <110){ // rule 1
      if (num_cs> 60 && num_cs< 100 && num_us> 90 && num_us< 110){ // rule 2
      //if (num_cs> 75 && num_cs< 85){ // rule 3
       counter++;
       System.out.println("No."+counter);
       System.out.println(state_name);
       System.out.println(sheet.getRow(j).getCell(cs_nameCol));
       System.out.println("US ranking is: " + usRank);
       System.out.println("CS ranking is: " + csRank);
       System.out.println();
      }
     }
    }

   }

  } catch(Exception ioe) {
   ioe.printStackTrace();
  }

 }
}
```

# Output is like this

![](http://i.imgur.com/79Lw0XW.png 'output_screenshot')

Now I can simply make my own filter rules to find the college maybe will accept me

,,,, a lot sense of sad, anyway.
