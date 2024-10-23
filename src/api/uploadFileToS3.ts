import AWS from 'aws-sdk'

export async function uploadFileToS3(file: File) {
	const s3 = new AWS.S3({
		endpoint: 'https://s3.ru-1.storage.selcloud.ru',
		accessKeyId: 'd646f5db75c94b8a89b9b80a0d64c926',
		secretAccessKey: 'aa51830aa8054e19b3c5fe4828394b0f',
		region: 'ru-1',
		signatureVersion: 'v4'
	})

	const name = `${new Date().getTime()}-${file.name}`

	const params = {
		Bucket: 'cs-telegram',
		Key: name,
		Body: file,
		ContentType: file.type,
		ACL: 'public-read'
	}

	try {
		await s3.upload(params).promise()

		return `https://457727d0-3339-4a3e-9814-ff011bb0a036.selstorage.ru/${name}`
	} catch (error) {
		console.error('Ошибка загрузки файла на S3:', error)
		throw new Error('Ошибка загрузки файла на сервер')
	}
}
