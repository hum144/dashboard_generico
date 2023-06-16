import BlogList from "components/blog/BlogList"
import Layout from "hocs/layout/Layout"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { connect } from "react-redux"
import { Navigate, useParams } from "react-router-dom"
import { get_author_blog_list, get_author_blog_list_page, get_blog } from "redux/actions/blog/blog"
import { get_categories } from "redux/actions/categories/categories"
import { PaperClipIcon } from '@heroicons/react/20/solid'
import axios from "axios"
import DOMPurify from "dompurify"
import {CKEditor} from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
function EditPost({
    post,
    get_blog,
    isAuthenticated
}) {

    const params = useParams()
    const slug = params.slug

    useEffect(() => {
        window.scrollTo(0, 0)
        get_blog(slug)
        console.log(formData)
    }, [])

    const [updateTitle, setUpdateTitle] = useState(false)
    const [updateTime, setUpdateTime] = useState(false)
    const [updateDescription, setUpdateDescription] = useState(false)
    const [updateContent, setUpdateContent] = useState(false)


    const resetStates = () => {
        setUpdateTitle(false)
        //setUpdateSlug(false)
        setUpdateDescription(false)
        setUpdateContent(false)
        //setUpdateCategory(false)
        //setUpdateThumbnail(false)
        setUpdateTime(false)
    }


    const [formData, setFormData] = useState({
        title: '', 
        time_read: '',
        description: '',
        category: '',
        status: '',
        
    })

    const {
        title,
        time_read,
        description,
        category,
        status,
        thumbnail,

    } = formData

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState('')

    const onSubmit = e => {
        e.preventDefault()
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };
        const formData = new FormData()
        formData.append('title', title)
        formData.append('slug', slug)
        formData.append('time_read', time_read)
        formData.append('description', description)
        formData.append('content', content)

        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/blog/edit`,
                    formData,
                    config)
                if (res.status === 200) {
                    setLoading(false)
                    resetStates(false)  
                    await get_blog(slug)
                } else {
                    setLoading(false)
                    resetStates(false)
                    alert('Error: no guardado')
                }

            } catch (err) {
                setLoading(false)
                resetStates(false)
                alert('Error al enviar')
            }
        }
        fetchData()

    }
    if(!isAuthenticated){
        return <Navigate to="/"/>
    }
    return (
        <Layout>
            <Helmet>
                <title>LazyCat | Blog</title>
            </Helmet>
            {
                post && isAuthenticated?
                    <>
                        <div className="">
                            <dl className="divide-y divide-gray-200">
                                {/*Div de titulo y botones finales*/}
                                <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                                    <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                                        <div className="ml-4 mt-4">
                                            <h3 className="text-3xl font-medium leading-6 text-gray-900">Edit post</h3>
                                            <p className="mt-3 text-lg text-gray-500">
                                                {post.title}
                                            </p>
                                        </div>
                                        <div className="ml-4 mt-4 flex-shrink-0">
                                            <button
                                                type="button"
                                                className="relative mx-1 inline-flex items-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                Delete
                                            </button>
                                            <button
                                                type="button"
                                                className="relative mx-1 inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                Publish
                                            </button>
                                            <button
                                                type="button"
                                                className="relative mx-1 inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                View Post
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* Fin div de titulo y botones */}
                                
                                {/*div de title*/}
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-500">Title</dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        {
                                            updateTitle ?
                                            
                                                <>
                                                    <form onSubmit={e => onSubmit(e)} className="flex w-full">
                                                    
                                                        <span className="flex-grow">
                                                            <input
                                                                value={title}
                                                                onChange={e => onChange(e)}
                                                                name='title'
                                                                type='text'
                                                                className="border border-gray-400 rounded-lg w-full"
                                                                autoFocus
                                                                required
                                                            />
                                                        </span>
                                                        <span className="ml-4 flex-shrink-0">
                                                            <button
                                                                type="submit"
                                                                className="rounded-md mr-2 bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                                            >
                                                                Save
                                                            </button>
                                                            <div
                                                                onClick={() => setUpdateTitle(false)}
                                                                className="cursor-pointer inline-flex rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                                            >
                                                                Cancel
                                                            </div>
                                                        </span>
                                                    </form>
                                                </>
                                                :
                                                <>
                                                    <span className="flex-grow text-lg">{post.title}</span>
                                                    <span className="ml-4 flex-shrink-0">
                                                        <div
                                                            onClick={() => {
                                                                formData.title=post.title
                                                                setUpdateTitle(true)}}
                                                            className="cursor-pointer inline-flex rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                                        >
                                                            Update
                                                        </div>
                                                    </span>
                                                </>
                                        }

                                    </dd>
                                </div>
                                {/*Termina el div de title*/}

                                {/*div de time_read*/}
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-500">Time read</dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        {
                                            updateTime ?
                                                <>
                                                    <form onSubmit={e => onSubmit(e)} className="flex w-full">

                                                        <span className="flex-grow">
                                                            <input
                                                                value={time_read}
                                                                onChange={e => onChange(e)}
                                                                name='time_read'
                                                                type='number'
                                                                className="border border-gray-400 rounded-lg w-full"
                                                                required
                                                            />
                                                        </span>
                                                        <span className="ml-4 flex-shrink-0">
                                                            <button
                                                                type="submit"
                                                                className="rounded-md mr-2 bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                                            >
                                                                Save
                                                            </button>
                                                            <div
                                                                onClick={() => setUpdateTime(false)}
                                                                className="cursor-pointer inline-flex rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                                            >
                                                                Cancel
                                                            </div>
                                                        </span>
                                                    </form>
                                                </>
                                                :
                                                <>
                                                    <span className="flex-grow text-lg">{post.time_read}</span>
                                                    <span className="ml-4 flex-shrink-0">
                                                        <div
                                                            onClick={() => {
                                                                formData.time_read=post.time_read
                                                                setUpdateTime(true)}}
                                                            className="cursor-pointer inline-flex rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                                        >
                                                            Update
                                                        </div>
                                                    </span>
                                                </>
                                        }

                                    </dd>
                                </div>
                                {/*Termina el div de time_read*/}

                                {/*div de description*/}
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-500">Description</dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        {
                                            updateDescription ?
                                                <>
                                                    <form onSubmit={e => onSubmit(e)} className="flex w-full">

                                                        <span className="flex-grow">
                                                            <textarea
                                                                rows={3}
                                                                value={description}
                                                                onChange={e => onChange(e)}
                                                                name='description'
                                                                type='text'
                                                                className="border border-gray-400 rounded-lg w-full"
                                                                required
                                                            />
                                                        </span>
                                                        <span className="ml-4 flex-shrink-0">
                                                            <button
                                                                type="submit"
                                                                className="rounded-md mr-2 bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                                            >
                                                                Save
                                                            </button>
                                                            <div
                                                                onClick={() => setUpdateDescription(false)}
                                                                className="cursor-pointer inline-flex rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                                            >
                                                                Cancel
                                                            </div>
                                                        </span>
                                                    </form>
                                                </>
                                                :
                                                <>
                                                    <span className="flex-grow text-lg">{post.description}</span>
                                                    <span className="ml-4 flex-shrink-0">
                                                        <div
                                                            onClick={() => {
                                                                formData.description=post.description
                                                                setUpdateDescription(true)}}
                                                            className="cursor-pointer inline-flex rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                                        >
                                                            Update
                                                        </div>
                                                    </span>
                                                </>
                                        }

                                    </dd>
                                </div>
                                {/*Termina el div de description*/}

                                {/*div de content*/}
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-gray-500">Content</dt>
                                    <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        {
                                            updateContent ?
                                                <>
                                                    <form onSubmit={e => onSubmit(e)} className=" w-full">
                                                        
                                                        <span className="flex-grow">
                                                            <CKEditor
                                                                editor={ClassicEditor}
                                                                data={post.content}
                                                                onChange={(event, editor)=>{
                                                                    const data= editor.getData()
                                                                    setContent(data)
                                                                }}

                                                                />
                                                            
                                                        </span>
                                                        <span className="ml-4 flex-shrink-0">
                                                            <button
                                                                type="submit"
                                                                className="rounded-md mr-2 bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                                            >
                                                                Save
                                                            </button>
                                                            <div
                                                                onClick={() => setUpdateContent(false)}
                                                                className="cursor-pointer inline-flex rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                                            >
                                                                Cancel
                                                            </div>
                                                        </span>
                                                    </form>
                                                </>
                                                :
                                                <>
                                                    <span className="flex-grow text-lg">
                                                        <div className="prose prose-lg max-w-6xl prose-indigo mx-auto mt-6 text-gray-500">
                                                            <p  dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.content)}} />
                                                        </div>
                                                    </span>
                                                    <span className="ml-4 flex-shrink-0">
                                                        <div
                                                            onClick={() => {setUpdateContent(true)}}
                                                            className="cursor-pointer inline-flex rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                                        >
                                                            Update
                                                        </div>
                                                    </span>
                                                </>
                                        }

                                    </dd>
                                </div>
                                {/*Termina el div de content*/}
                            </dl>
                        </div>
                    </> :
                    <>
                        Loading
                    </>
            }

        </Layout>
    )
}
const mapStateToProps = state => ({
    post: state.blog.post,
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, {
    get_blog,
})(EditPost)