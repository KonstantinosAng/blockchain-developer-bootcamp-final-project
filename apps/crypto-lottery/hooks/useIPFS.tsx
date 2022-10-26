import axios from "axios"

const useIPFSUpload = () => {
	const uploadFile = async (data: object) => {
		const resFile = await axios({
			method: "post",
			url: process.env.NEXT_PUBLIC_PINATA_GATEWAY_POST_URL,
			data: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
			},
		})
		const fileHash = new URL(resFile.data.IpfsHash, process.env.NEXT_PUBLIC_PINATA_GATEWAY_GET_URL)?.href
		return fileHash
	}

	return { uploadFile }
}

export default useIPFSUpload
