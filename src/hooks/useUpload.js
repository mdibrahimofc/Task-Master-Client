import axios from "axios";

const useUpload = async image => {
    const form = new FormData()
    form.append("image", image)
    const {data} = await axios.post("https://api.imgbb.com/1/upload?key=d064a7491c3ebc2b2b1798175bf10f48", form)
    console.log(data.data.display_url);
    return data.data.display_url
}
export default useUpload