import React from 'react';
import { create  } from 'react-test-renderer';
import {render, screen} from '@testing-library/react'
import ProductList from './ProductList';

describe('ProductList related tests', () => {
    const fetchMock = jest
    .spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve([]) }))

  test('should render component <ProductList /> properly', () => {
  const component = create(
    <ProductList />
  );

  expect(component.toJSON()).toMatchSnapshot();
  });

  
  it('should fetch all the products', async () => {  
 
    const fakeProducts = [{
        brand:"Apple", 
        category:  "smartphones",
        description :"An apple mobile which is nothing like apple", 
        discountPercentage :12.96, 
        id :1, 
        images:  ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
        price: 549,
        rating: 4.69,
        stock: 94,
        thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
        title:"iPhone 9"
        }]
       

    fetchMock.mockResolvedValue({ status: 200, json: jest.fn(() => fakeProducts) })
    render (<ProductList />)
    expect(await screen.findByText('Products')).toBeInTheDocument();
   // expect(await screen.findByText('iPhone 9')).toBeInTheDocument()
  })
})


  
