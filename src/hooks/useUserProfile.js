import { useState, useEffect } from 'react'
import axios from 'axios'
import FormData from 'form-data'

export default function useUserProfile() {
  const [profile, setProfile] = useState(null)
  const [profileForm, setProfileForm] = useState(null)
  const [checkout, setCheckout] = useState(null)
  const [orders, setOrders] = useState(null)
  const [loading, setLoading] = useState({ updateBiodata: false, updatePassword: false, updateProfilePicture: false })
  const [success, setSuccess] = useState({ updateBiodata: false, updatePassword: false })
  const [error, setError] = useState({ updateBiodata: false, updatePassword: false, updateProfilePicture: false })
  const [modalPicture, setModalPicture] = useState(false)
  const [previewPicture, setPreviewPicture] = useState(null)
  const { token } = localStorage

  useEffect(() => {
    axios.get(`http://127.0.0.1:8080/api/users/user`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        setProfile(res.data.data)
        setProfileForm(res.data.data)
        setPreviewPicture(`http://127.0.0.1:8080/uploads/images/${res.data.data.profilePict}`)
      })

      return () => {
        setProfile(null)
        setProfileForm(null)
        setPreviewPicture(null)
      }
  }, [])

  useEffect(() => {
    axios.get(`http://127.0.0.1:8080/api/transactions/user`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => {
        setCheckout(res.data.data)
      })

    axios.get(`http://127.0.0.1:8080/api/orders/user/ongoing`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => {
        setOrders(res.data.data)
      })
  }, [])

  const setBiodata = (value) => {
    setProfileForm(value)
  }

  const updateBiodata = (values) => {
    setLoading({ updateBiodata: true, updatePassword: false, updateProfilePicture: false })
    axios.patch(`http://127.0.0.1:8080/api/users/profile/biodata`, values, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => {
        setTimeout(() => {
          axios.get(`http://127.0.0.1:8080/api/users/user`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
            .then(res => {
              setProfile(res.data.data)
              setProfileForm(res.data.data)
              setLoading({ updateBiodata: false, updatePassword: false, updateProfilePicture: false })
              setSuccess({ updateBiodata: true, updatePassword: false })

              setTimeout(() => {
                setSuccess({ updateBiodata: false, updatePassword: false })
              }, 3000)
            })
        }, 1000)
      })
      .catch(err => {
        setTimeout(() => {
          setError({ updateBiodata: true, updatePassword: false, updateProfilePicture: false })
          setLoading({ updateBiodata: false, updatePassword: false })
          setTimeout(() => {
            setError({ updateBiodata: false, updatePassword: false, updateProfilePicture: false })
          }, 3000)
        }, 1000)

      })

  }

  const updatePassword = (values) => {
    setLoading({ updateBiodata: false, updatePassword: true, updateProfilePicture: false })
    axios.patch(`http://127.0.0.1:8080/api/users/profile/password`, values, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => {
        setTimeout(() => {
          axios.get(`http://127.0.0.1:8080/api/users/user`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
            .then(res => {
              setProfile(res.data.data)
              setProfileForm(res.data.data)
              setLoading({ updateBiodata: false, updatePassword: false, updateProfilePicture: false })
              setSuccess({ updateBiodata: false, updatePassword: true })

              setTimeout(() => {
                setSuccess({ updateBiodata: false, updatePassword: false })
              }, 3000)
            })
        }, 1000)
      })
      .catch(err => {
        setTimeout(() => {
          setError({ updateBiodata: false, updatePassword: true, updateProfilePicture: false })
          setLoading({ updateBiodata: false, updatePassword: false })
          setTimeout(() => {
            setError({ updateBiodata: false, updatePassword: false, updateProfilePicture: false })
          }, 3000)
        }, 1000)
      })
  }

  const openModalChangePicture = () => {
    setModalPicture(true)
  }

  const closeModalChangePicture = () => {
    setPreviewPicture(`http://127.0.0.1:8080/uploads/images/${profile.profilePict}`)
    setModalPicture(false)
  }

  const handleUpload = (e) => {
    const [file] = e.target.files || e.dataTransfer.files;

    uploadFile(file)
  }

  function uploadFile(file) {
    const reader = new FileReader()
    reader.readAsBinaryString(file)

    reader.onload = () => {
      // this is the base64 data
      const fileRes = btoa(reader.result)
      // console.log(`data:image/jpg;base64,${fileRes}`);
      setPreviewPicture(`data:image/jpg;base64,${fileRes}`)
    };

    reader.onerror = () => {
      console.log("There is a problem while uploading...")
    }
  }

  const changePicture = (values) => {
    let data = new FormData()
    data.append("image", values.file, values.file.fileName)
    setLoading({ updateBiodata: false, updatePassword: false, updateProfilePicture: true })

    axios.patch('http://127.0.0.1:8080/api/users/profile/picture', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': `multipart/form-data; boundary=coba`
      }
    })
      .then(res => {
        setTimeout(() => {
          axios.get(`http://127.0.0.1:8080/api/users/user`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
            .then(res => {
              setProfile(res.data.data)
              setProfileForm(res.data.data)
              setLoading({ updateBiodata: false, updatePassword: false, updateProfilePicture: false })
              setModalPicture(false)
            })
        }, 1000)
      })
      .catch(err => {
        setTimeout(() => {
          setError({ updateBiodata: false, updatePassword: false, updateProfilePicture: true })
          setLoading({ updateBiodata: false, updatePassword: false, updateProfilePicture: false })
        }, 1000)
      })
  }

  const filterOrders = by => {
    axios.get(`http://127.0.0.1:8080/api/orders/user/${by}`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => setOrders(res.data.data))
  }

  return [
    profile,
    loading,
    success,
    error,
    profileForm,
    setBiodata,
    updateBiodata,
    updatePassword,
    modalPicture,
    openModalChangePicture,
    closeModalChangePicture,
    previewPicture,
    handleUpload,
    changePicture,
    checkout,
    orders,
    filterOrders
  ]
}
