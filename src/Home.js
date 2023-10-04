import { React ,useEffect,useState} from 'react';
import axios from 'axios';
const Home = () => {
    const [Posts , setPosts] = useState([]);
    const apiEnd = 'https://jsonplaceholder.typicode.com/posts';

    useEffect(()=>{
        const getPosts = async () =>{
            const { data : res} =  await axios.get(apiEnd)
            setPosts(res)
        };
        getPosts();
    },[])
    const addPost = () =>{
        const post = {title:"New Post" , body:"new"};
        axios.post(apiEnd , post);
        setPosts([post, ...Posts])
    }
    const handelupdate = async (post)=>{
        post.title = "update title";
        await axios.put (apiEnd + "/" + post.id)
        const postsClone = [...Posts]
        const index = postsClone.indexOf(post)
        postsClone[index] = {...post};
        setPosts(postsClone)
    }
    const handeldelete = (post) =>{
        axios.delete(apiEnd + "/" + post.id )
        setPosts(Posts.filter(p => p.id !== post.id))
    }
    return (
<>
    
            <div className='container'>
                <h2>there are {Posts.length}post in the database</h2>
                <button onClick={addPost} className='btn btn-primary '  >Add Post</button>    
                <table className='table'>
                  <thead>
                     <tr>
                       <th>Title</th>
                      
                     </tr>
                     <tbody>
                      {Posts.map((post) => (
                          <tr key={post.id}>
                              <td> {post.title} </td>
                                <td> <button onClick={()=>handelupdate(post)} className='btn  btn-info me-5 btn-sm'>Update</button></td> 
                                <td> <button onClick={()=> handeldelete(post)}  className='btn  btn-danger btn-sm '>Delete</button></td>    
                          </tr>
                      ))}
                     </tbody>
                  </thead>
              </table>
            </div>
</>
    );
}

export default Home;
