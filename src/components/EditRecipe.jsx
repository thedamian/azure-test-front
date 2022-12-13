
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    Upload,
    Cascader,
    message
} from 'antd';

export default function EditRecipe() {
    const [image, setImage] = useState()
    const [formValues, setFormValues] = useState()
    const { id } = useParams()
    const navigate = useNavigate()
    const [defaultFileList, setDefaultFileList] = useState([
        {
            uid: "1",
            name: "damian.jpg",
            url: "https://www.damianmontero.com/damian.jpg",

        }
    ])
    useEffect(() => {
        fetch(`${process.env.REACT_APP_ENDPOINT}/recipes/${id}`)
            .then(response => response.json())
            .then(data => {
                //console.log(data)
                defaultFileList[0].url = data[0].image
                setDefaultFileList(defaultFileList)
                setFormValues(data[0])
            })
            .catch(err => console.error(err))
    }, [id])
    function convertFile(file, obj) {
        if (file) {
            const fileType = file.type || ""
            const reader = new FileReader()
            reader.readAsBinaryString(file)
            reader.onload = (ev) => {
                // convert it to base64
                let obj1 = { ...obj, image: `data:${fileType};base64,${window.btoa(ev.target.result)}` }
                //console.log(obj.image)
                //return //(add .image to line above-console.log(obj1.image)and uncoment return )
                fetch(`${process.env.REACT_APP_ENDPOINT}/recipes/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj1),
                })
                    .then(response => response.json())
                    .then(data => {
                        message.success('Submit success!');
                        navigate(`/recipe/${id}`)
                    })
                    .catch(console.error)
            }
        }
    }
    const onFinish = (values) => {
        console.log(values)
        let obj = {
            name: values.name,
            servings: values.servings,
            readyin: values.readyin,
            ingredients: values.ingredients,
            instructions: values.instructions,
            image: values.image,
            type: values.type
        }
        if (values?.image && values?.image.file) {
            convertFile(values?.image.file.originFileObj, obj)
        } else {

            fetch(`${process.env.REACT_APP_ENDPOINT}/recipes/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            })
                .then(response => response.json())
                .then(data => {
                    message.success('Submit success!');
                    navigate(`/recipe/${id}`)
                })
                .catch(console.error)
        }
    }
    const [form, setForm] = useState({})
    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const { TextArea } = Input;

    const onFinishFailed = (errorInfo) => {
        console.log('failed', errorInfo)
    }

    if (!formValues) return <p>Loading</p>
    // console.log(formValues)

    return (
        <div style={{ height: "100%" }}>

            <Form
                initialValues={formValues}
                className='add-new'
                name='addNew'
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item label="Name of Recipe" name="name" onChange={handleForm} rules={[
                    {
                        required: true,
                    },
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Servings" name="servings" onChange={handleForm} rules={[
                    {
                        required: true,
                    },
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Ready in (minutes)" name="readyin" onChange={handleForm} rules={[
                    {
                        required: true,
                    },
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Ingredients" name="ingredients" onChange={handleForm} rules={[
                    {
                        required: true,
                    },
                ]}>
                    <TextArea rows={16} />
                </Form.Item>
                <Form.Item label="Instructions" name="instructions" onChange={handleForm} rules={[
                    {
                        required: true, message: "Instructions are required"
                    },
                ]}>
                    <TextArea rows={16} />
                </Form.Item>
                <Form.Item label="Type" name="type" onChange={handleForm} rules={[
                    {
                        required: true,
                    },
                ]}>
                    <Cascader
                        options={[
                            { value: 'salads', label: 'Salads' },
                            { value: 'dairy', label: 'Dairy' },
                            { value: 'seafood', label: 'Seafood' },
                            { value: 'poultry', label: 'Poultry' },
                            { value: 'meat', label: 'Meat' },
                            { value: 'desserts', label: 'Desserts' },
                        ]}
                    />
                </Form.Item>
                <Form.Item name='image' label="Upload">
                    <Upload defaultFileList={defaultFileList} listType="picture-card">
                        <div>
                            <PlusOutlined />
                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Upload
                            </div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item label="Button">
                    <Button htmlType="submit">Submit
                    </Button>
                </Form.Item>

            </Form>
        </div>
    );
};
