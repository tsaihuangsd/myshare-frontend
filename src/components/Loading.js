import {Spinner} from 'reactstrap';

const Loading = ()=>{
  return (
    <div className = 'callback-container'>
        <h1>Loading...</h1>
        <Spinner style = {{width: '3rem', height: '3rem'}} type = "grow" />
      </div>
  )
}

export default Loading