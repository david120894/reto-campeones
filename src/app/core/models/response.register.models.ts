export interface ResponseRegisterModels {
  dni: string
  name: string
  lastName:string
  shirtSize: string
  category: string
  createAt: string
  qrCode: {
    image: string
    message: string
    error : null
    success: boolean
  }
}
