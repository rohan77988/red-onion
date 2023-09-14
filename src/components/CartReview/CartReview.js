import React, { useEffect, useState } from "react";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import demoData from "../../demoData";
import CartReviewItem from "../CartReviewItem/CartReviewItem";
import CartHidden from "../CartHidden/CartHidden";
import { Form,Button } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import fireStoreDB from "../../firebase";
import { ToastContainer, toast } from 'react-toastify';


const CartReview = () => {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [delivery, setDelivery] = useState("");



  const removeItem = (productKey) => {
    console.log("removed", productKey);
    const newRemoveCart = cart.filter((pd) => pd.keys !== productKey);
    setCart(newRemoveCart);
    removeFromDatabaseCart(productKey);
  };
  useEffect(() => {
    //useEffect here to load data from local storage
    const getSavedDataFromLS = getDatabaseCart();
    const itemKeys = Object.keys(getSavedDataFromLS);
    //retrive ls data key and match with demoData key
    //find all matches and get data
    const cartProducts = itemKeys.map((key) => {
      const product = demoData.find((fd) => fd.keys === key);
      // console.log(product)
      product.quantity = getSavedDataFromLS[key];
      return product;
    });
    setCart(cartProducts);
  }, []);

  const handleClick = async () => {
    try {
      let t = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
        );
        let d = 0;
        if(t>30){
          d=3
        }else if(t>1 && t <30){
          d=5
        }else{
          d=0
        }
        let grandTotal = t + d;
        
        const docRef = await addDoc(collection(fireStoreDB, "orders"), {
          address,
          phone,
          delivery,
          orders: cart,
          total: grandTotal  
        });
        console.log("Document written with ID: ", docRef.id);
     
        let tt1 = <div>Total = {t} <br/>Delivery Fee = {d} <br/>-------------------------------------<br/>GrandTotal = ${grandTotal.toFixed(2)}</div>

        toast.info(tt1, {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });

          
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <div className="container py-5">
      {/* <div className="float-left">
      {cart.map((pd) => (
        <CartReviewItem
          removeItem={removeItem}
          foodsToReview={pd}
        ></CartReviewItem>
      ))}
     </div>
     <div className="float-right">
       <CartHidden cart={cart}></CartHidden>
     </div> */}
      <div className="row">
        <div className="col-md-4">
          <Form>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Address"  onChange={(e)=>setAddress(e.target.value)}/>
              <Form.Label>Phone</Form.Label>
              <Form.Control type="number" placeholder="Phone number" onChange={(e)=>setPhone(e.target.value)}/>
              <Form.Label>Delivery Details</Form.Label>
              <Form.Control as="textarea" rows="3" onChange={(e)=>setDelivery(e.target.value)}/>
            </Form.Group>
            <Button className="btn btn-danger" size="lg" block onClick={()=>handleClick()}>Save & Continue</Button>
          </Form>
        </div>
        <div className="col-md-5">
          {
             <div>
               <div className="">
             {cart.map((pd) => (
               <CartReviewItem
                 removeItem={removeItem}
                 foodsToReview={pd}
               ></CartReviewItem>
             ))}
            </div>
             </div>
          }
        </div>
        <div className="col-md-3">
              <CartHidden cart={cart}></CartHidden>
            </div> 
      </div>
    </div>
  );
};

export default CartReview;
