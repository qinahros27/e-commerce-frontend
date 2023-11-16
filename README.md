# E-commerce App
Fetch data from the given API endpoint to create an e-commerce website, using TypeScript and SASS.

## Technologies 
- TYPESCRIPT
- REDUX
- SCSS

## Function of the website
User function:

    - Log in: with correct email and password, if not there will be an message error.

    - Sign up: cannot use existed email, must enter all input, password and retype password must be the same.

    - Edit information: user can edit email , name , avatar , password. User must enter current password right to change the information.

User (role: admin) function: 

    - Like above.

    - Manage product: admin can add , edit or delete product. For edit and delete , admin must know the id of the product to first find the product then edit or delete.

Product function: 

    - Search by name.

    - Filter by category or price or both.

Cart function: 

    - Add item to cart by clicking on the cart Icon on the Home page or "add to cart" button on the product detail page.

    - User can edit the quantity of the item in cart page.

    - If the user chooses the item that had been in the cart, only the quantity of the item increases. The items in the cart will not be duplicated.

    - User can delete the item from cart or clear all item. 

    - The total price will up-to-date whenever the cart state change.

When the user refreshes the page, the cart data and user information will not disappear.

## Project structure
```
.
└───FRONTEND-PROJECT
    └───authenticate
        └───authenticateCheck.ts
    └───hooks
        └───useAppDispatch.ts
        └───useAppSelector.ts
    └───images
        └───appstore.png
        └───google.png
        └───mar1.png
        └───mar2.png
        └───mar3.png
        └───websitelogo.png
    └───pages
        └───components
            └───AddProducts.tsx
            └───CardItem.tsx
            └───DeleteProduct.tsx
            └───EditProduct.tsx
            └───HeaderBar.tsx
            └───PageFooter.tsx
            └───SearchBar.tsx
            └───SortItem.tsx
            └───UploadImage.tsx
        └───AccountSetting.tsx
        └───CartPage.tsx
        └───Home.tsx
        └───Login.tsx
        └───ManageProduct.tsx
        └───NotFound.tsx
        └───OrderSuccess.tsx
        └───ProductDetail.tsx
        └───SignUp.tsx
    └───redux
        └───reducers
            └───cartReducer.ts
            └───categoryReducer.ts
            └───productsReducer.ts
            └───userReducer.ts
        └───store.ts
    └───styles
        └───components
            └───AccountSetting.scss
            └───CardItem.scss
            └───CartPage.scss
            └───HeaderBar.scss
            └───Home.scss
            └───Login.scss
            └───ManageProduct.scss
            └───OrderSuccess.scss
            └───PageFooter.scss
            └───ProductDetail.scss
            └───SignUp.tscss
            └───SortItem.scss
        └───styles.scss
    └───tests
        └───data
            └───cart.ts
            └───categories.ts
            └───product.ts
            └───users.ts
        └───reducers
            └───cartReducer.test.ts
            └───categoryReducer.test.ts
            └───productReducer.test.ts
            └───userReducer.test.ts
        └───servers
            └───categoryServer.ts
            └───productServer.ts
            └───userServer.ts
        └───shared
            └───store.ts
        └───types
            └───AddorEditProduct.ts
            └───Cart.ts
            └───CartUpdateQty.ts
            └───Category.ts
            └───Product.ts
            └───ProductDetail.ts
            └───User.ts
            └───UserCredential.ts
    └───App.tsx
    └───index.tsx
    └───index.css
    └───react-app-env.d.ts
    └───reportWebVitals.ts
    └───setupTests.ts
    └───tsconfig.json
    └───package.json
    └───package-lock.json
    └───README.md
```
## Getting started
Clone the respository from github: ```git clone```

This is live link of this project from Netlify: [E-COMMERCE APP](https://anhqsahara.netlify.app)