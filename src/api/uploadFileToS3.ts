import AWS from 'aws-sdk'

export async function uploadFileToS3(file: File) {
	// Настройка AWS S3
	const s3 = new AWS.S3({
		endpoint: 'https://s3.timeweb.cloud',
		accessKeyId: 'PKG54KTOL8XGWFIOOQGB',
		secretAccessKey: 'Tqe58oD57zo1NFcu3GORTagvfMBriwR2FLxfSbJi',
		region: 'ru-1',
		signatureVersion: 'v4'
	})

	const params = {
		Bucket: 'your-s3-bucket-name', // Имя вашего S3 bucket
		Key: `teams/${file.name}`, // Уникальное имя файла
		Body: file,
		ContentType: file.type,
		ACL: 'public-read' // Для того, чтобы файл был публично доступен
	}

	try {
		const { Location } = await s3.upload(params).promise()
		return Location // Возвращает URL загруженного файла
	} catch (error) {
		console.error('Ошибка загрузки файла на S3:', error)
		throw new Error('Ошибка загрузки файла на сервер')
	}
}
