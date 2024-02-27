import {
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Paper,
  TablePagination,
  Modal
} from '@mui/material';
import React, { useState } from 'react';
import { FaEye, FaEyeDropper } from 'react-icons/fa6';
import AddInventory from './AddInventory';
import DeleteInventory from './DeleteInventory';
import ViewInventory from './ViewInventory';
import EditInventory from './EditInventory';
import ModalComponent from 'component/Modals/Modal';
import { useItemState } from 'context/ItemContext';
import useItems from 'Hooks/useItems';
import { useEffect } from 'react';
let cleaningToolsInventory = [
  {
    name: 'Bleach',
    description: 'A powerful disinfectant and stain remover',
    quantity: 5, // in liters or kilograms
    unit: '5 liters',
    id: 1,
    img: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'Dish Soap',
    description: 'For washing dishes and cutting through grease',
    quantity: 2, // in liters or kilograms
    unit: '10 liters',
    id: 2,
    img: 'https://images.unsplash.com/photo-1607006483224-73ce0729e22a?q=80&w=2023&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'Broom',
    description: 'For sweeping floors',
    quantity: 3, // in units
    unit: '5 lg',
    id: 3,
    img: 'https://images.unsplash.com/photo-1585933646706-7b629be871aa?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'Vacuum Cleaner',
    description: 'For cleaning carpets and floors',
    quantity: 1, // in units
    unit: '3 kg',
    id: 4,
    img: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
  // Add more cleaning tools as needed
];

const Inventory = () => {
  const { setInventory } = useItemState(); // Get setIsLoggedIn from context
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [component, setComponent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { allInventory, getInventory, inventoryLoading } = useItems();

  useEffect(() => {
    getInventory();
  }, []);
  console.log('fnfsndjfnadj', allInventory);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const openModal = e => {
    e.preventDefault();

    if (e.target.value === 'add') setComponent(<AddInventory closeModal={closeModal} />);
    if (e.target.value === 'delete') setComponent(<DeleteInventory closeModal={closeModal} />);
    if (e.target.value === 'view') setComponent(<ViewInventory closeModal={closeModal} />);
    if (e.target.value === 'edit') setComponent(<EditInventory closeModal={closeModal} />);

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <ModalComponent isOpen={isModalOpen} onClose={closeModal} setIsModalOpen={setIsModalOpen}>
        {component}
      </ModalComponent>{' '}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h3" gutterBottom>
                Inventory List
              </Typography>
              <button
                value={'add'}
                onClick={e => {
                  openModal(e);
                }}
                className="text-white flex justify-center  mb-4 gap-x-2 items-center px-4 py-2 bg-blue-700 w-auto lg:h-[40px] text-base border-t-2 border-empWhite"
              >
                Add to Inventory
              </button>
              {(allInventory && !inventoryLoading) && (
                <Paper>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Index</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Unit</TableCell>
                        <TableCell>Pairs</TableCell>
                        <TableCell>Action</TableCell>

                        <TableCell>View</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {allInventory.map((item, i) => (
                        <TableRow key={item._id}>
                          <TableCell>{i + 1}</TableCell>
                          <TableCell>{item.equipment}</TableCell>
                          <TableCell>{item.description}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{item.unit}</TableCell>
                          <TableCell>{item.pair ? 'Pairs' : 'Single'}</TableCell>
                          <TableCell>
                            <button
                              value={'edit'}
                              onClick={e => {
                                openModal(e);
                                setInventory(item);
                              }}
                              className="text-white flex justify-center  gap-x-2 items-center px-4 py-2 bg-gray-300 w-full rounded-lg mb-1.5 lg:h-[40px] text-base border-t-2 border-empWhite"
                            >
                              Edit
                            </button>
                            <button
                              value={'delete'}
                              onClick={e => {
                                openModal(e);
                                setInventory(item);
                              }}
                              className="text-white flex justify-center  gap-x-2 items-center px-4 py-2 rounded-lg bg-red-700 w-full lg:h-[40px] text-base border-t-2 border-empWhite"
                            >
                              Delete
                            </button>
                          </TableCell>
                          <TableCell>
                            <button
                              value={'view'}
                              onClick={e => {
                                openModal(e);
                                setInventory(item);
                              }}
                              className="text-white flex justify-between   gap-x-2 items-center px-4 py-2 rounded-lg bg-green-500 w-full lg:h-[40px] text-base border-t-2 border-empWhite"
                            >
                              View
                              <FaEye />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={allInventory.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
              )}
              {inventoryLoading && (
                <div className="loader bg-[#fff]">
                  <div className="justify-content-center jimu-primary-loading"></div>
                </div>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Inventory;
