'use server'


export async function createTopic(formData:FormData) {
    // todo: revalidate the homepage
    const name = formData.get('name')
    const description = formData.get('description')

    console.log(name, description)
}