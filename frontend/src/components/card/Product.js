import React, { useState } from "react";
import ImageHelper from "../../core/helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "../../core/helper/cartHelper";
import { isAuthenticated } from "../../auth/helper";

const Product = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  reload = undefined,
  setReload = (f) => f,
  // function(f){return f}
}) => {
  const [redirect, setRedirect] = useState(false);

  const cartTitle = product ? product.name : "A photo from pexels";
  const cartDescription = product ? product.description : "Default description";
  const cartPrice = product ? product.price : "Default";

  const addToCart = () => {
    if (isAuthenticated()) {
      addItemToCart(product, () => setRedirect(true));
      console.log("Added to cart");
    } else {
      console.log("Login Please!");
    }
  };

  const getAredirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addToCart) => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          <i class="fa-solid fa-cart-plus"></i>
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            //TODO: handle this too
            removeItemFromCart(product.id);
            setReload(!reload);

            console.log("Product removed from cart");
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          <i class="fa-solid fa-cart-xmark"></i>
        </button>
      )
    );
  };

  return (
    <div className="card">
      <div className="item--image">
        {getAredirect(redirect)}
        <ImageHelper product={product} />
      </div>

      <div className="item--desc">
        <p>{cartTitle}</p>
        <p>${cartPrice}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{showAddToCart(addToCart)}&nbsp;&nbsp;&nbsp;{showRemoveFromCart(removeFromCart)}</p>
        </div>
      </div>
  );
};

export default Product;

{/* <div className="card">
      <div className="item--image">
        <ImageHelper product={product} className="card--img"/>
      </div>

      <div className="item--desc">
        <p>{cartTitle}</p>
        <p>{cartPrice}</p>
      </div>

    </div> */}


