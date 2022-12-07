
//To do: create My Shelf 
//Add multiple books for an author 


let gutenSearchTerms= 'Moby%20Dick'
let gutenapiKey= '914b0ef6ce7256c5ea1844b670f2737c';
let gutenURL= `https://gutendex.com/books?search=${gutenSearchTerms}`;
let NYTAPI='HAqJfPnwCBCMBNwu6V1DkVQjIeWfAMqZ'
let NYTauthor="Herman+Melville";
let NYTURL= `https://api.nytimes.com/svc/books/v3/reviews.json?author=${NYTauthor}&api-key=${NYTAPI}&title`

const searchArea = document.querySelector('.barAndButton');
const userInput =document.querySelector('.input')
const searchResultsDiv =document.querySelector('.searchResultsDiv');
const NYTarticles =document.querySelector('.NYTarticles');
const searchButton =document.querySelector('.search');
const scroll= document.querySelector('.scroll');
const gutenSorry=document.querySelector(".gutenSorry");
const shelf = document.querySelector(".shelf");
const addToShelfDiv=document.querySelector(".addToShelfDiv");


async function GetGutenData(){

    //FORMATTING AND ENTERING GUTEN SEARCH TERMS
   //==================================
    let userSearch= userInput.value;
    console.log(userSearch);
    let formattedInput="";
    for(letters of userSearch){
        if(letters == " "){
           formattedInput += "%20";
        }
        else{
            formattedInput += letters;
        }
    }

    console.log(formattedInput);
    let gutenSearchTerms = formattedInput;
    gutenURL= `https://gutendex.com/books?search=${gutenSearchTerms}`;
    console.log(gutenURL);
    let theResponse = await fetch(gutenURL);
    theResponse = await theResponse.json();

    if(theResponse.results[0]){
    console.log(theResponse.results);
    let bookImageURL= theResponse.results[0]["formats"]["image/jpeg"];
    console.log(bookImageURL);


    //APPEND BOOK IMAGE
   //==================================
    //hover text
    let readFullText=document.createElement('p');
    readFullText.className="readFullText";
    readFullText.innerText="Click here to access the full in PDF format. "
    searchResultsDiv.append(readFullText);
    
    //link
    let bookLink=document.createElement('a');
    searchResultsDiv.append(bookLink);
    bookLink.href = theResponse.results[0].formats["text/html"];
    bookLink.className="bookLink";
    bookLink.target="_blank";

    //book image
    let bookImage=document.createElement('img');
    bookLink.append(bookImage);
    bookImage.src = bookImageURL;
    bookImage.className="bookImage";

  
    //Add to shelf button
    //=============================

    // let addToShelf=document.createElement('button');
    // searchResultsDiv.append(addToShelf);
    // addToShelf.className="addToShelf";
    // addToShelf.innerText="Add to my shelf";


    //==========================
    // addToShelfDiv.addEventListener('click', function(event){
        
    //     let shelfLink=document.createElement('a');
    //     shelf.append(shelfLink);
    //     shelfLink.href = theResponse.results[0].formats["text/html"];
    //     shelfLink.className="shelfLink";
    //     shelfLink.target="_blank";
       
    //     let shelfImage=document.createElement('img');
    //     shelfLink.append(shelfImage);
    //     shelfImage.src = bookImageURL;
    //     shelfImage.className="shelfImage"
    // })

    //EXTRACTING AUTHOR
   //==================================
    let author = theResponse.results[0]["authors"][0]["name"];
    console.log(author);

    //FORMATING AUTHOR FOR NYT
    //===========================
    let formattedAuthor=author.split(" ");

    if(formattedAuthor.length > 2){
        formattedAuthor = formattedAuthor[1].trim().replace(",", "")+ "+" + formattedAuthor[2].trim().replace(",", "")+ "+" + formattedAuthor[0].trim().replace(",", "");
        console.log(formattedAuthor);
    }
    else{
    formattedAuthor = formattedAuthor[1].trim().replace(",","")+ "+" + formattedAuthor[0].trim().replace(",", "");
    console.log(formattedAuthor);
    }
    GetNYTData(formattedAuthor);

    }   
    else{
    console.log("Unfortunately this book is not available via the Guten Project");
   
    let sorryMessage = document.createElement('p');
    gutenSorry.append(sorryMessage);
    sorryMessage.className="sorryMessage"
    sorryMessage.innerText= "Unfortunately the book or author you entered is not available."
    }

}


//NYT API FUNCTION
//=============================
async function GetNYTData(authorName){

    NYTauthor = authorName;
    let NYTURL= `https://api.nytimes.com/svc/books/v3/reviews.json?author=${NYTauthor}&api-key=${NYTAPI}&title`;
    console.log(NYTURL);
    let theResponse = await fetch(NYTURL);
    theResponse = await theResponse.json();
    console.log(theResponse);
    let results= theResponse.results;

    let numOfArrays=theResponse.num_results;
    let reviewTitle = document.createElement('h2');
    NYTarticles.append(reviewTitle);
    
    if (numOfArrays == 1){
    reviewTitle.innerText= `There is ${numOfArrays} related New York Times Book Review.`
    }
    else{
        reviewTitle.innerText= `There are ${numOfArrays} related New York Times Book Reviews.`
    }
    let bookBeingReviewed =theResponse.results["book_title"];
    let authornbeingReviewed =theResponse.results["book_author"];
    for(let i=0; i < numOfArrays; i++){
    

            let articleURL = results[i].url; 
            let NYTarticle=document.createElement('a');
            NYTarticle.target="_blank";
            NYTarticles.append(NYTarticle);
            NYTarticle.href = articleURL;
            NYTarticle.className="NYTarticle"

            let bookBeingReviewed =theResponse.results[i]["book_title"];
            let authorBeingReviewed =theResponse.results[i]["book_author"];
            NYTarticle.innerText = `A review of ${authorBeingReviewed}'s ${bookBeingReviewed}.`;
            console.log(articleURL);
        }
    }
       






searchButton.addEventListener('click', function(event){

    while (searchResultsDiv.firstChild) {
    searchResultsDiv.removeChild(searchResultsDiv.lastChild);
    }

    while (NYTarticles.firstChild) {
    NYTarticles.removeChild(NYTarticles.lastChild);
    }

    while (gutenSorry.firstChild) {
        gutenSorry.removeChild(gutenSorry.lastChild);
        }

    GetGutenData();
} )