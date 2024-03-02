
import { app } from "./app.js";

app.listen(process.env.PORT , () => {
    console.log(`Server started port:${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})

