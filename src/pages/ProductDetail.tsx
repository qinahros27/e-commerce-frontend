import { useEffect, useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Carousel  from 'react-material-ui-carousel';
import { useParams } from 'react-router-dom';

import { fetchAProduct } from '../redux/reducers/productsReducer';
import { addItem } from '../redux/reducers/cartReducer';
import useAppDispatch from '../hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import useAppSelector from '../hooks/useAppSelector';
import HeaderBar from './components/HeaderBar';
import PageFooter from './components/PageFooter';
import '../styles/style.scss';

const ProductDetail = () => {
  const {cart} = useAppSelector(state => state.cartReducer);
  const {productDetail} = useAppSelector(state => state.productsReducer);
  const [qty, setQty] = useState(1);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  let dateOrder: Date = new Date(); 
  dateOrder.setDate(dateOrder.getDate() + 2);
  let CartId:number = cart.length+1;
  
  const Additem = () => {
      dispatch(addItem(
        {
          id: CartId,
          product: {
            id: productDetail.id,
            title: productDetail.title,
            price: productDetail.price,
            images: productDetail.images,
            description: productDetail.description,
            category: productDetail.category.id as number,
          },
          quantities: qty
        }
      )) 
  }

  useEffect(() => {
    if(id != undefined) {
        dispatch(fetchAProduct({productId: parseInt(id) as number}));
    }  
  }, [])

return (
    <div className='ProductDetail__outer'>
      <HeaderBar/>
      <div className='ProductDetail'>
        {productDetail &&
          <div className='ProductDetail__container'>
            <div className='ProductDetail__item'>
              <Carousel animation="slide" className='ProductDetail__Carousel' NextIcon={<ArrowForwardIosIcon/>} PrevIcon={<ArrowBackIosNewIcon/>}>
                {productDetail.images.map((img,index)=> (
                    <img src={img} alt={productDetail.title}/>
                ))} 
              </Carousel>
            </div>

            <div className='ProductDetail__item detail'>
              <h2>{productDetail.title}</h2>

              <div className='ProductDetail__item_box-detail'>
                  <h4>&euro;{productDetail.price}</h4>
                  <p> Prices for items sole by Sahara including VAT. Depending on your delivery address, VAT may vary at Checkout. For other items, please see <a href='/notfound'>details</a></p>
              </div>

              <div className='ProductDetail__item_box-detail'>
                <p><strong>Category: </strong>{productDetail.category.name}</p>
              </div>

              <div className='ProductDetail__item_box-detail'>
                <h5>About this item: </h5>
                <p>{productDetail.description}</p>
              </div>
            </div>  

            <div className='ProductDetail__item'>
              <div className='ProductDetail__item_order'>
                <h3>&euro;{productDetail.price}</h3>
                <p><a href='/notfound'>FREE delivery</a> <strong>{dateOrder.toDateString()}</strong> on eligible first order. Order within 24 hours</p>
                <h4>In Stock</h4>

                <div className='ProductDetail__item_order-quantity'>
                  <p>Quantity: </p>
                  <select id="qty" name="qty" onChange={e => setQty(parseInt(e.target.value))}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                  </select>
                </div>

                <button onClick={() => Additem()}>Add to Cart</button>
                
                <div className='ProductDetail__item_buyButton'>
                  <button>Buy Now</button>
                </div>
              </div>
            </div>  
          </div>
        }
      </div>

      <div className='ProductDetail__outer_button'>
        <ArrowBackIcon fontSize='large' onClick={() => navigate('/')}/>
      </div>
      <PageFooter/>
    </div>
  )
}

export default ProductDetail