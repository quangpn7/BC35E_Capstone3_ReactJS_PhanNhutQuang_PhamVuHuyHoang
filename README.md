#CAPSTONE PROJECT 3
###  Project: The Shoe Shop
### Group 4:
##### - Phan Nhựt Quang
##### - Phạm Vũ Huy Hoàng

+ **Design**: Trương Tấn Khải
+ **API**: CyberSoft
---
# I. App Introduce
- TheShoeShop is a website created by ReactJS with some others library. The main purpose of the project is helping us to review all the Front-End techniques that we have learn at the whole time. Including: API, Redux, ReactJs, ES6 HOF, SCSS.
- This document will go as follow:
  - I. Introduction (current)
  - II. App overview
  - III. Detail:
    - 1. Components
    - 2. Redux (actions, reducer)
    - 3. Form validation
  - IV. Conclusion

---
# II. App Overview:
- Main component: Stateless component (Functional component)
 <img src="./capstone3Comp.excalidraw.png"></img>
- Using: Bootstrap 4, Ant-design, redux/toolkit, Facebook login plugin,...
- API: provided by Cybersoft
- 5 main pages:
  - Home
  - Login
  - Register
  - Cart
  - Profile
****Profile page need authentication (user) to navigate in***
- Image source: Cybersoft
- SCSS, styling: Quang, Hoang
- Document: Quang
- Branches:
  - main
  - quang
  - hoang
* Each member has his/her own task with the App
- Detail features:
  - View product -> Select -> Add to cart -> Order
  - View profile -> Change info, password -> update
  - Register -> Input needed values -> Register
  - Login -> Input email, password or Login with Facebook ->...
- App's src folder tree:
```
src
├── assets
│   ├── css
│   │   ├── main.css
│   │   └── main.css.map
│   ├── fonts
│   ├── img
│   │   ├── facebook-icon.png
│   │   ├── image 3.png
│   │   ├── image 4.png
│   │   ├── image 5.png
│   │   ├── image 6.png
│   │   ├── next-btn.png
│   │   └── prev-btn.png
│   └── scss
│       ├── base
│       │   ├── _reset.scss
│       │   └── _typo.scss
│       ├── components
│       │   ├── _button.scss
│       │   ├── _navbar.scss
│       │   ├── _productCard.scss
│       │   └── _slider.scss
│       ├── helpers
│       │   ├── _mixin.scss
│       │   └── _variables.scss
│       ├── layout
│       │   ├── _footer.scss
│       │   ├── _header.scss
│       │   └── _productFeature.scss
│       ├── main.scss
│       └── pages
│           ├── _cart.scss
│           ├── _detail.scss
│           ├── _login.scss
│           ├── _profile.scss
│           ├── _register.scss
│           ├── _search.scss
│           └── _shoescard.scss
├── components
│   ├── HOC
│   │   ├── Modal
│   │   │   └── Modal.jsx
│   │   └── PasswordForm
│   │       └── ChangePass.jsx
│   ├── LoginFacebook
│   │   └── LoginFacebook.jsx
│   ├── ProductItem
│   │   └── ProductItem.jsx
│   └── shoesCard
│       └── ShoesCard.jsx
├── hooks
│   └── useFetch.jsx
├── index.js
├── pages
│   ├── Carts.jsx
│   ├── Detail.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Profile.jsx
│   ├── Register.jsx
│   └── Search.jsx
├── redux
│   ├── configStore.jsx
│   └── reducer
│       ├── modalReducer.jsx
│       ├── productReducer.jsx
│       └── userReducer.jsx
├── templates
│   └── HomeTemplates
│       └── Template.jsx
└── utils
    ├── config.jsx
    └── ultils.jsx
```
- More detail in the next section
****
# III. Detail
## 1. Components
### 1.1 HOC
**- Modal.jsx**

  - This component will defaultly invisible in the app. It will be only visible when user trigger at some action (change password action,...) .- Modal.jsx will receive a component from Redux to display expected content.
  - In fact, the developement of the app currently is not so widely to use this. But in the future, it is more useful to re-use it to display further information.
###  1.2 Stateless Components
**- Template.jsx**

  - Template.jsx is the master layout of all pages
  - It contains header and footer of the app
  - Header: 
      - Nav-link
      - Logo
      - Cart
    - Footer:
      - Back links

**- Home.jsx**
- This component contains:
  - Carousel (Ant-Design)
  - Product list (From API, render from Redux)
  - Pagination (Ant-Design):
    - Config:
      - 6 items on load

**-Register.jsx**
  - This component contains:
    - Register form:
      - email: string
      - password: string
      - confirmPassword: string
      - name: string
      - gender: boolean
      - phone: string/ number (API auto convert) *Tested
    - Get input and validation by: `Formik` and `Yup` library
    - Each input field has its own specific schemma which is suitable to the expected data.
    - Check the component for more detail and how it work