import React,{useContext,useState} from 'react';
import {Form,Button,Container,Header,Icon,Divider, Grid} from 'semantic-ui-react';
import {useMutation} from '@apollo/client'
import gql from 'graphql-tag';


import {AuthContext} from '../../context/auth'; 
import {useForm} from '../../util/hooks'

function Register(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

     const { onChange ,onSubmit ,values} = useForm(registerUser,{
        userName:'',
        email:'',
        password:'',
        confirmPassword:''
     })


    

    const [addUser ,{loading}] = useMutation(REGISTER_USER,{
        update(_,{data :{register: userData}}){
            
            context.login(userData);
            props.history.push('/');
        },
        onError(err){
            console.log(err.graphQLErrors[0].extensions.errors);
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables:values
    })

    function registerUser(){
        addUser();
    }


     



    return (
        <Container style={{marginTop:30}} >
        <Header as='h2'>
            <Icon name='user plus' />
            <Header.Content>Register</Header.Content>
        </Header>

        <Divider clearing className="divider" />

         <Grid columns={2}>
            <Grid.Column>
            <div className="registerContainer">
            <Form onSubmit={onSubmit} noValidate className ={loading ? 'loading': ''} >
                
                    <Form.Input 
                                label="userName"
                                placeholder="userName"
                                name="userName"
                                type="text "
                                error={errors.userName ? true : false}
                                value={values.userName}
                                onChange={onChange}
                                />

                    <Form.Input 
                                label="email" 
                                placeholder="email"
                                name="email"
                                type="email"
                                value={values.email}
                                error={errors.email ? true : false}
                                onChange={onChange}
                                />

                    <Form.Input 
                                label="password"
                                placeholder="password"
                                name="password"
                                type="password"
                                value={values.password}
                                error={errors.password ? true : false}
                                onChange={onChange}
                                />

                    <Form.Input 
                                label="confirmPassword"
                                placeholder="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={values.confirmPassword}
                                error={errors.confirmPassword ? true : false}
                                onChange={onChange}
                                />
                        <Button type="submit" primary>register</Button>         
            </Form>

            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map((item)=>{
                            console.log(item);
                            return(<li key={item}>{item}</li>);
                                                         
                        })}
                    </ul>
                </div>
            )}
         </div>
            </Grid.Column>





            <Grid.Column>
            <div className="registerContainer">
            <Form onSubmit={onSubmit} noValidate className ={loading ? 'loading': ''} >
                
                    <Form.Input 
                                label="phone"
                                placeholder="phone"
                                name="phone"
                                type="text "
                                error={errors.phone ? true : false}
                                value={values.phone}
                                onChange={onChange}
                                />

                    <Form.Input 
                                label="whatsapp" 
                                placeholder="whatsapp"
                                name="whatsapp"
                                type="whatsapp"
                                value={values.whatsapp}
                                error={errors.whatsapp ? true : false}
                                onChange={onChange}
                                />

                    <Form.Input 
                                label="instagram"
                                placeholder="instagram"
                                name="instagram"
                                type="instagram"
                                value={values.instagram}
                                error={errors.instagram ? true : false}
                                onChange={onChange}
                                />

                    <Form.Input 
                                label="website"
                                placeholder="website"
                                name="website"
                                type="password"
                                value={values.website}
                                error={errors.website ? true : false}
                                onChange={onChange}
                                />
                        {/* <Button type="submit" primary>register</Button>          */}
            </Form>

            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map((item)=>{
                            console.log(item);
                            return(<li key={item}>{item}</li>);
                                                         
                        })}
                    </ul>
                </div>
            )}
         </div>
            </Grid.Column>
         </Grid>
            

        </Container>
    )
}

const REGISTER_USER =gql`
mutation Register(
    $userName:String!,
    $email:String!,
    $password:String!,
    $confirmPassword:String!
){
    register(
        registerInput:{
            userName:$userName
            email:$email
            password:$password
            confirmPassword:$confirmPassword
            category:"60894a794ed0880aec225900"
            profileImg:"" 
            phone:""
            facebook:""
            instagram:""
            whatsapp:""
            website:""
        }
    ){
        id email userName createdAt profileImg token
    }
}
`

export default Register
