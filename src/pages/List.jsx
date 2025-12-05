import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Link } from 'react-router-dom'
function ListPage() {
  const [tours, setTours] = useState([])

  useEffect(() => {
    const getTours = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/tours`)
        setTours(data)
      } catch (error) {
        toast.error("Lỗi tải dữ liệu!")
      }
    }
    getTours()
  }, [])

  const handleDelete = async id => {
    if (confirm('Delete')) {
      try {
        await axios.delete('http://localhost:3000/tours/' + id)
        setTours(tours.filter(tour => tour.id !== id))
      } catch (error) {
        toast.error(error.message)
        console.log(error)
      }
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách</h1>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">ID</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Name</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Destination</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Duration</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Price</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Image</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Description</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Action</th>
              <th className="px-4 py-2 border border-gray-300 text-left">active</th>
            </tr>
          </thead>

          <tbody>
            {tours.map(tour => (
              <tr key={tour.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300">{tour.id}</td>
                <td className="px-4 py-2 border border-gray-300">{tour.name}</td>
                <td className="px-4 py-2 border border-gray-300">{tour.destination}</td>
                <td className="px-4 py-2 border border-gray-300">{tour.duration}</td>
                <td className="px-4 py-2 border border-gray-300">{tour.price}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <img width={100} src={tour.image} alt="" />
                </td>
                <td className="px-4 py-2 border border-gray-300">{tour.description}</td>

                <td className="px-4 py-2 border border-gray-300">
<div className="flex gap-2">
<button 
className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
onClick={() => handleDelete(tour.id)}>
                      Xóa
                    </button>

  <Link to={`/edit/${tour.id}`}>
    <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
      Sửa
    </button>
  </Link>
</div>

                </td>
                                  <td>
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer" id="switch1" />
                    <div class="w-11 h-6 bg-gray-300 peer-checked:bg-blue-600 rounded-full peer-focus:ring-2 peer-focus:ring-blue-300 transition-colors duration-200"></div>
                    <span class="ml-3 text-sm font-medium text-gray-700">
                      Bật / Tắt
                    </span>
                  </label>
                </td>
              </tr>
            ))}

            {tours.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500 italic">
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListPage
