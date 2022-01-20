# Belly Button Bacteria

## Technology Used in this Project

The project uses a json data file to create an interactive dashboard. The project uses CSS, HTML and JavaScript and then publishes the document in github pages.  Go to settings > pages and then click the link to view and interact with the HTML dashboard. See below for screen snapshot.

![pages](https://github.com/ryanmorin/bellybutton/blob/main/pages.png)

## Projects Data

The dataset consists of 153 subjects.  Each subject is assigned a unique identifying number.  The number is stored as an Javascript object.  The key is called 'name'. There two other keys in the json array are: metadata and samples. 

Samples have the subjects identifying number as well as the number of bacteria (key = sample values), the type of bacteria (key = otu_labels) and the id number of the bacteria found (key = otu_ids).

Metadata consists of participant level non-identifying information. The information is stored as a json array. The following fields can be found in metadata:

1. ID
2. Ethnicity
3. Gender
4. Age
5. Location
6. wfreq
7. bbtype
