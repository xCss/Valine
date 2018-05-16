import {h,render,Component} from 'preact'

export default class Clock extends Component{
    constructor(props){
        super(props)
        this.state.time = Date.now
    }
    componentDidMount(){
        this.timer = setInterval(()=> this.setState({time:Date.now}),1000)
    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }
    render(props,state){
        console.log(props,state)
        
        let time = new Date(state.time).toLocaleTimeString()
        return <span>{ time }</span>
    }

}
