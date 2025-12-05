import { useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom' 

function AddPage() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [destination, setDestination] = useState('')
  const [duration, setDuration] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
    const navigate = useNavigate() 
  // const [category, setCategory] = useState('')
const validateData = () => {
  let message = "";
  if (!name || !price || !destination || !duration || !description || !image) {
    message = "Vui lòng nhập đầy đủ thông tin!"
  }
  if (price && isNaN(Number(price)) || Number(price) < 0) {
    message = "Giá phải là số dương!"
  }
  if(name && (name.length < 3 || name.length > 100 )){
    message = "Tên phải từ 3 đến 100  ký tự!"
  }
    if (duration && isNaN(Number(duration)) || Number(duration) < 0) {
    message = "Thời gian lớn hơn 0!"
  }
  return message;
};


  // handleChange
  const handleSubmit = async event =>{
    event.preventDefault()
    const message = validateData();
if (message){
  toast.error(message);
  return;
}
    try{
      await axios.post(`http://localhost:3000/tours` ,{
        name,
        price: Number(price),
        //category : category,
        destination,
        duration,
        description,
         image,
      }) 
      toast.success("thêm thành công")
       navigate("/list")  
    }catch(error){
      toast.error(error.message)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Thêm mới</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Text input */}
        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            Name
          </label>
          <input
            value={name}
            onChange={event => setName(event.target.value)}
            type="text"
            id="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
       
        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            Price
          </label>
          <input
            value={price}
            onChange={event => setPrice(event.target.value)}
            type="text"
            id="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            Destination
          </label>
          <input
            value={destination}
            onChange={event => setDestination(event.target.value)}
            type="text"
            id="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            Duration
          </label>
          <input
            value={duration}
            onChange={event => setDuration(event.target.value)}
            type="text"
            id="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            Description
          </label>
          <input
            value={description}
            onChange={event => setDescription(event.target.value)}
            type="text"
            id="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

                <div>
          <label htmlFor="text" className="block font-medium mb-1">
            Image
          </label>
          <input
            value={image}
            onChange={event => setImage(event.target.value)}
            type="text"
            id="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Checkbox list */}
        {/* <div>
          <label className="block font-medium mb-1">Checkbox</label>

          <div className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              id="flexCheck1"
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <label htmlFor="flexCheck1" className="text-gray-700">
              checkbox 1
            </label>
          </div>
        </div> */}

        {/* Select */}
        {/* <div>
          <label htmlFor="selectOption" className="block font-medium mb-1">
            Chọn danh mục
          </label>  
          <select
            id="selectOption"
            className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1">Tour trong nước</option>
            <option value="2">Tour quốc tế</option>
  
          </select>
        </div> */}

        {/* Submit button */}
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddPage