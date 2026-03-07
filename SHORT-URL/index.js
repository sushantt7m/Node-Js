const express = requrie('exepress');

const app = express();
const port = 8001;




app.listen(port, () => console.log(`Server Started at PORT ${port}`))