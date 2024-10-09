# Questions

1. Discuss your strategy and decisions implementing the application. Please, consider time complexity, effort cost, technologies used and any other variable that you understand important on your development process.
Answer: I used Django Framework with React library. And to handle csv files I used Pandas. Since I worked with a small sample, I handled the data from backend all at once, but if the volume was higher, I thought it would be better to implement asynchronous calls to request data from backend for each search an user provide (For example everytime he clicks on the search button). But this would be done after user input some text or provide more info about what he is searching, for example if he want to filter by date or other specification. 

2. How would you change your solution to account forfuture columns that might be requested, such as “Bill Voted On Date” or“Co-Sponsors”?
Answer: I would implement those filters along the existing ones. For each filter I would have to provide a default value, so user don't need to fill each field or be ultra specific. The ideia is that the more specific he is, the more accurate result we can provide him. And probably I would make a method to go through each filter to make code maintainable and reusable. Another option to make the search faster is to convert list into dictionaries, this could be done by setting each id as a key and the value would be the whole object of the entity.

3. How would you change your solution if instead of receiving CSVs of data, you were given a list of legislators or bills that you should generate a CSV for?
Answer: If I have to generate a CSV, that would be easily manageable using pandas library with python. This was common for me and it is just a matter of understanding what are the information the user want, so I can convert this list info the columns and format data if necessary so the text can be readable. So to imagine, user can click on a button to "Generate CSV" and than I create a logic that will call asynchronously the script from python (or just a view in Django) to process the request and after return the data result to front-end, and then just create the csv so user can download it in the browser.

4. How long did you spend working on the assignment?
Answer: I took 1 day to complete.