import React, { useState } from 'react';
import {
    Card, CardHeader, CardBody, Typography, Dialog, DialogHeader,
    DialogBody, DialogFooter, Button,
} from "@material-tailwind/react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // carousel styles


export default function ViewItems({ initialItems }) {

    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleOpen = (item) => {
        setSelectedItem(item);
        setOpen(true);
    };

    console.log(initialItems)

    return (
        <div className='mx-auto my-auto w-full h-full flex flex-col gap-12'>
            ViewItems
            <Card className='w-full h-full'>
                <CardHeader variant="gradient" className="mb-8 p-6 bg-gray-800">
                    <Typography className='text-white'>
                        TechSols Assignment
                    </Typography>
                </CardHeader>
                <CardBody className="overflow-x-auto px-0 pt-0 pb-2">
                    {/* Set max height and make table scrollable vertically */}
                    <div className="overflow-y-auto md:max-h-[60vh]"> {/* 60vh sets the max height to 60% of the viewport height */}
                        <table className="w-full md:min-w-[640px] table-auto">
                            <thead>
                                <tr>
                                    {["Name", "Image", "Type", "Action"].map((el) => (
                                        <th
                                            key={el}
                                            className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                        >
                                            <Typography
                                                variant="small"
                                                className="text-[11px] font-bold uppercase text-blue-gray-400"
                                            >
                                                {el}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {initialItems.map(
                                    (item, key) => {
                                        const className = `py-3 px-5 ${key === initialItems.length - 1
                                            ? ""
                                            : "border-b border-blue-gray-50"
                                            }`;

                                        return (
                                            <tr key={item.id}>
                                                <td className={className}>
                                                    <div className="flex items-center gap-4">
                                                        <Typography className="text-xs font-semibold text-blue-gray-600">
                                                            {item.name}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={className}>
                                                    <img src={item.coverImage} alt="product"
                                                        className='h-12 w-12 object-cover rounded'
                                                    />
                                                </td>
                                                <td className={className}>
                                                    <div className="flex items-center gap-4">
                                                        <Typography className="text-xs font-semibold text-blue-gray-600">
                                                            {item.type}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={className}>
                                                    <div className="flex items-center gap-4">
                                                        <button
                                                            onClick={() => handleOpen(item)}
                                                            className="text-xs font-semibold text-blue-gray-600 underline"
                                                        >
                                                            View
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
            <Dialog open={open} handler={() => setOpen(false)}
                className='max-w-full md:max-w-1/2 h-fit gap-5 flex bg-sky-100 flex-col justify-center items-center mx-auto mt-28 p-10'
                overlayProps={{
                    className: "backdrop-blur-sm bg-black/30", // 👈 This adds blur and dim effect
                }}
            >
                {selectedItem && (
                    <>
                        <DialogHeader>{selectedItem.name}</DialogHeader>
                        <DialogBody className="overflow-y-auto w-full space-y-4">

                            {/* Image Carousel */}
                            <div className="mb-4">
                                <Carousel showThumbs={false} infiniteLoop>
                                    {[selectedItem.coverImage, ...selectedItem.additionalImages].map((img, index) => (
                                        <div key={index}>
                                            <img src={img} alt={`image-${index}`} className='rounded-lg object-contain h-64 mx-auto' />
                                        </div>
                                    ))}
                                </Carousel>
                            </div>

                            {/* Item Details */}
                            <div className="space-y-2 px-2">
                                <Typography variant="small"><strong>Name:</strong> {selectedItem.name}</Typography>
                                <Typography variant="small"><strong>Type:</strong> {selectedItem.type}</Typography>
                                <Typography variant="small"><strong>Description:</strong> {selectedItem.description}</Typography>


                            </div>
                        </DialogBody>

                        <DialogFooter className='flex gap-5'>
                            <a
                                href={`mailto:${selectedItem.email}?subject=Product Enquiry: ${selectedItem.name}&body=Hi, I am interested in "${selectedItem.name}". Please provide more details.`}
                                className="flex justify-center items-center bg-blue-950 text-white px-4 py-2 rounded"
                            >
                                Enquire
                            </a>
                            <Button
                                className='flex justify-center items-center bg-red-950 text-white px-2'
                                onClick={() => setOpen(false)}
                            >
                                Close
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </Dialog>

        </div>
    )
}
