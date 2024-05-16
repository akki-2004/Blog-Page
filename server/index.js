import  express from 'express'
import bodyParser from'body-parser'
import axios from 'axios'
import cors from 'cors'
const port = 7894;
const app=express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extented:true}))
app.use(cors())
app.get('/fetchData', async (req, res) => {
    try {
      const externalApiData = await axios.get('http://localhost:7694/blogs');
      res.json(externalApiData.data);
    } catch (error) {
      console.error('Error fetching data from external API:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.get('/fetchData/:customId', async(req, res) => {
    const { id } = req.params.customId;
    const externalApi = await axios.get(`http://localhost:7694/blogs/${id}`);
    res.json(externalApi.data);
  });
  
  app.post('/updateData/:customId', async (req, res) => {
    try {
      const blogId = req.params.customId;
      const updatedBlogData = req.body;
      const externalApiResponse = await axios.patch(`http://localhost:7694/blogs/${blogId}`, updatedBlogData);
      res.json({ message: 'Blog post updated successfully' });
    } catch (error) {
      console.error('Error updating the blog post:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.post('/postData', async (req, res) => {
    try {
      const blogData = req.body;
      const externalApiResponse = await axios.post('http://localhost:7694/blogs', blogData);
      res.json({ message: 'Blog post created successfully' });
    } catch (error) {
      console.error('Error creating a new blog post:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
});