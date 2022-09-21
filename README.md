# Educated Oxymorons Dashboard

### Project Overview
Thorugh this project I created a dashboard that can contain different type of data in a structured manner that we needed for our company and youtube channle

It has several module
 - Auth -> login and register
 - Meme -> Add/View/Edit meme ideas
 - Comics -> Add/View/Edit comic ideas
 - Thumbnail -> Add/View/Edit Thumbnail ideas
 - Script -> Add/View/Edit youtube video scripts

The project is created on SupaBase and Its a really great CMS option and after this whenever I mention CMS I specifically mean Supabase

### Frontend Specifications
   The frontend is a next.js project with typescript for type safety and extra flexibilitty
Frontend folder structure is like this:
|->public (assets) <br>
|->pages (all the pages) <br>
|->utils (supabase configuration) <br>
|->styles (All the style sheets) <br>
|->types (all interfaces) <br>

Also frontend is configures with eslint, commitlint, prettier, commitizen, cz-conventional and husky to reduce error while commiting and publishing code

Starting from Auth module:
  Here we used the email auth provider to add a new user in our supabase project, and there are two kind of user, we declared a rule through which we only allow a specific email is to do the crud operations and others can only view the data
  Also notable thing is, there is a publish/unpublish option, all other users can only view the published item.
 For designing css modules and bootstrap is used, real time communication is used (provided by supabase).
  Server side endering is used for all the pages for first render
  
 
