<div>
<h1>Rogue Scholar</h2>
</div>

Rogue Scholar is designed for readers who want to know everything about what they are reading. The site allows users to search for a specific book. If it is part of the Guten Project, which provides the full texts of books in the public domain, the site will return the book's cover, a link to the entire text, and generate any associated reviews that have been published by the New York Times.


## Motivation

I've always considered myself a rogue scholar. Meaning, I am not an academic but I love to investigate the things that interest me.  When I find a book I love, I go down a rabbit hole of articles, podcasts, videos, interviews with the author, and so on. I've always wanted a one-stop shop for these investigations and a way to keep track of the things I find. Rogue Scholar is the answer for me and others like me.   

## Screenshots 
![alt GIF of funcitoning site](https://res.cloudinary.com/dqfviar71/image/upload/v1676590023/RogueScholar_copy_kbnskr.gif)

***

## Technical Framework and Language Usage:
- JavaScript
- HTML
- CSS
- APIs

## Build Status
Deployed@**[Rogue Scholar](https://rogue-scholar.netlify.app/)**

***

## Future Goals
- [ ] Expand search results to include videos, podcasts, and academic articles.
- [ ] Ability to save books.


## Challenges
- Getting comfortable routing to multiple APIs   
- While the user is entering the book's title for the Guten Project API, the New York Times API worked best with the author's name. Since both API's had the author's names in different orders, it was a fun challenge to get the author's names into the right order and format so that the second API would yield search results.

        let formattedAuthor=author.split(" ");
        if(formattedAuthor.length > 2){
        formattedAuthor =
        formattedAuthor[1].trim().replace(",", "")+ "+" + formattedAuthor[2].trim().replace(",", "")+ "+" + formattedAuthor[0].trim().replace(",", "");
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

## Triumphs
- Solidifying my understanding of routing APIs.
- Sharpening my JavaScript skills. 

***
