// import Table from 'react-bootstrap/Table';
// import request from '../../configs/Request';
// import { useEffect, useState } from 'react';
// import * as React from 'react';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';
// const Blog = () => {
//   const [products, setproducts] = useState([]);
//   const [productsFull, setproductsFull] = useState([]);
//   const [dataAdd, setdataAdd] = useState({
//     name: '',
//     price: 0,
//     description: '',
//   });
//   const [page, setPage] = useState(1);
//   const [loadding, setloadding] = useState(false);
//   const handleChangePage = (
//     event: React.ChangeEvent<unknown>,
//     value: number
//   ) => {
//     setPage(value);
//   };
//   const [soft, setsoft] = useState(0);
//   useEffect(() => {
//     const run = async () => {
//       const dataFull = await request.get(`/products`);
//       dataFull.status == 200 && setproductsFull(dataFull.data);
//       if (soft == 0) {
//         const data = await request.get(`/products?_page=${page}&_per_page=4`);
//         data.status == 200 && setproducts(data.data.data);
//       } else if (soft == 2) {
//         const datatest = await request.get(
//           `/products?_sort=price&_page=${page}&_per_page=4`
//         );
//         datatest.status == 200 && setproducts(datatest.data.data);
//         console.log(datatest);
//       }
//     };
//     run();
//   }, [page, loadding, soft]);
//   const [isEdit, setisEdit] = useState(false);
//   const [dataEdit, setdataEdit] = useState(null);
//   const handleEdit = (i) => {
//     setdataEdit(i);
//     setdataAdd({
//       name: i.name,
//       price: Number(i.price),
//       description: i.description,
//     });
//     setisEdit(true);
//   };
//   const handleDel = async (i) => {
//     await request.delete(`/products/${i.id}`);
//     setloadding((pre) => !pre);
//   };
//   const handeChange = (e) => {
//     const { name, value } = e.target;
//     setdataAdd({ ...dataAdd, [name]: value });
//   };
//   const handleAdd = async (e) => {
//     e.preventDefault();
//     await request.post('/products', {
//       name: dataAdd.name,
//       price: Number(dataAdd.price),
//       description: dataAdd.description,
//     });
//     setloadding((pre) => !pre);
//     load();
//   };
//   const handleEditSuccess = async (e) => {
//     e.preventDefault();
//     console.log(dataEdit);
//     console.log(dataAdd);
//     await request.put(`/products/${dataEdit.id}`, {
//       name: dataAdd.name,
//       price: dataAdd.price,
//       description: dataAdd.description,
//     });
//     setisEdit(false);
//     setloadding((pre) => !pre);
//     load();
//   };
//   const handleCancel = async (e) => {
//     e.preventDefault();
//     setisEdit(false);
//     load();
//   };
//   const load = () => {
//     setdataAdd({
//       name: '',
//       price: 0,
//       description: '',
//     });
//   };

//   const handleChangeSelect = (e) => {
//     setsoft(e.target.value);
//   };
//   const [search, setsearch] = useState('');
//   const handleSearch = (e) => {
//     setsearch(e.target.value);
//   };
//   useEffect(() => {
//     const run = async () => {
//       if (search !== '') {
//         const data = await request.get(`/products?name=${search}`);
//         if (data) {
//           setproducts(data.data);
//         }
//         return;
//       }
//       const data = await request.get(`/products?_page=${page}&_per_page=4`);
//       data.status == 200 && setproducts(data.data.data);
//     };
//     run();
//   }, [search]);

//   return (
//     <div className="p-4 row">
//       <div className="col-md-4">
//         <h4>Admin</h4>
//         <form>
//           <div className="form-group mt-2">
//             <label>Name</label>
//             <input
//               type="text"
//               className="form-control"
//               value={dataAdd.name}
//               name="name"
//               onChange={handeChange}
//             />
//           </div>
//           <div className="form-group mt-2">
//             <label>Price</label>
//             <input
//               type="number"
//               className="form-control"
//               value={dataAdd.price}
//               name="price"
//               onChange={handeChange}
//             />
//           </div>
//           <div className="form-group mt-2">
//             <label>Description</label>
//             <input
//               type="text"
//               className="form-control"
//               value={dataAdd.description}
//               name="description"
//               onChange={handeChange}
//             />
//           </div>
//           {isEdit ? (
//             <>
//               <button
//                 className="btn btn-success mt-4"
//                 onClick={handleEditSuccess}
//               >
//                 Edit
//               </button>{' '}
//               <button className="btn btn-secondary mt-4" onClick={handleCancel}>
//                 Cancel
//               </button>
//             </>
//           ) : (
//             <button className="btn btn-primary mt-4" onClick={handleAdd}>
//               Submit
//             </button>
//           )}
//         </form>
//       </div>
//       <div className="col-md-8">
//         <h4>List Product</h4>
//         <select
//           className="form-select mb-2"
//           aria-label="Default select example"
//           onChange={handleChangeSelect}
//         >
//           <option value={0}>Default</option>
//           {/* <option value={1}>high to low</option> */}
//           <option value={2}>low to hight</option>
//         </select>
//         <input
//           type="text"
//           placeholder="sreach"
//           className="form-control mt-2 mb-2"
//           value={search}
//           onChange={handleSearch}
//         />
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Price</th>
//               <th>description</th>
//               <th>#</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.length == 0 && 'Không có sản phẩm'}
//             {products &&
//               products.length > 0 &&
//               products.map((i, index) => {
//                 return (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{i.name}</td>
//                     <td>{i.price}</td>
//                     <td>{i.description}</td>
//                     <td>
//                       <button
//                         className="btn btn-danger"
//                         onClick={() => handleDel(i)}
//                       >
//                         Del
//                       </button>{' '}
//                       <button
//                         className="btn btn-secondary"
//                         onClick={() => handleEdit(i)}
//                       >
//                         Edit
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//           </tbody>
//         </Table>
//         {productsFull.length > 0 && search == '' && (
//           <Stack spacing={2}>
//             <Pagination
//               onChange={handleChangePage}
//               count={Math.ceil(productsFull.length / 4)}
//               color="primary"
//             />
//           </Stack>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Blog;

import React from 'react';

const Blog = () => {
  return <div>Blog</div>;
};

export default Blog;
