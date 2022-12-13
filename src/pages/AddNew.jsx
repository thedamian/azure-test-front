import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserChoiceContext } from '../context/UserChoiceContext';
import { useContext } from "react";
import {
    Button,
    Form,
    Input,
    Upload,
    Cascader,
    message
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default function AddNew() {
    const { user, setUser } = useContext(UserChoiceContext)

    function convertFile(file, obj) {
        if (file) {
            const fileType = file.type || ""
            const reader = new FileReader()
            reader.readAsBinaryString(file)
            reader.onload = (ev) => {
                // convert it to base64
                const obj1 = { ...obj, image: `data:${fileType};base64,${window.btoa(ev.target.result)}` }
                console.log(obj1.image)
                //return //(add .image to line above-console.log(obj1.image)and uncoment return )
                fetch(`${process.env.REACT_APP_ENDPOINT}/recipes`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj1),
                })
                    .then(response => response.json())
                    .then(data => {
                        message.success('Submit success!');
                        navigate(`/${obj1.type}`)
                    })
                    .catch(console.error)
            }
        }
    }
    const navigate = useNavigate()
    const [form, setForm] = useState({})

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const { TextArea } = Input;

    const onFinish = (values) => {
        //console.log(values)
        const obj = {
            name: values.name,
            servings: values.servings,
            readyin: values.readyin,
            ingredients: values.ingredients,
            instructions: values.instructions,
            image: values.image,
            type: values.type[0]
        }
        // This is taking long... and image is not yet defined immediately below
        if (values?.image) {
            convertFile(values?.image.file.originFileObj, obj)
        } else {
            fetch(`${process.env.REACT_APP_ENDPOINT}/recipes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            })
                .then(response => response.json())
                .then(data => {
                    message.success('Submit success!');
                    navigate(`/${values.type[0]}`)
                })
                .catch(console.error)
        };
    }
    const onFinishFailed = () => {
        message.error('Submit failed!');
    };
    useEffect(() => {
        if (!user) {
            navigate('/sign-in')
        }
    }, [user])

    return (
        <div style={{ height: "100%" }}>
            <h1 className='form-add-recipe'>Add Recipe</h1>
            <Form
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
                    <Upload listType="picture-card">
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

}