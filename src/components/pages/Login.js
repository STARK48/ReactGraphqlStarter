import React,{useContext,useState} from 'react';
import {Form,Button,Label,Grid,Header,Image} from 'semantic-ui-react';
import {useMutation} from '@apollo/client'
import gql from 'graphql-tag';



import {AuthContext} from '../../context/auth'; 
import {useForm} from '../../util/hooks'

function Login(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

     const { onChange ,onSubmit ,values} = useForm(registerUser,{        
        email:'',
        password:''
        
     })


    

    const [loginUser ,{loading}] = useMutation(LOGIN,{
        update(_,{data :{login: userData}}){
            
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
        loginUser ();
    }


     



    return (


        
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h1' color='black' >
                
                    
                    NAMAZA
    <i class="fas fa-plane-departure" style={{marginLeft:5}}/>
                </Header>
                
                <div className='contForm' >

                        <Form onSubmit={onSubmit} noValidate className ={loading ? 'loading': ''} size='large' >
                        
                        
                            <Form.Input 
                                        icon='mail' 
                                        iconPosition='left' 
                                        placeholder="email"
                                        name="email"
                                        type="email"
                                        value={values.email}
                                        error={errors.email ? true : false}
                                        onChange={onChange}
                                        />

                            <Form.Input 
                                        fluid
                                        icon='lock'
                                        iconPosition='left'
                                        placeholder='Password'                                
                                        name="password"
                                        type="password"
                                        value={values.password}
                                        error={errors.password ? true : false}
                                        onChange={onChange}
                                        />

                        
                                <Button type="submit" color='blue' fluid size='large' >Login</Button>         
                    </Form>

                </div>

                <div className="registerContainer" style={{marginTop:20}}>
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

    )
}

const LOGIN =gql`
mutation Register(    
    $email:String!,
    $password:String!
    
){
    login(        
            
            email:$email
            password:$password
            
        
    ){
        id email userName createdAt profileImg token
    }
}
`

export default Login
