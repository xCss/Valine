import {h,render,Component} from 'preact'

export class ValineComponent extends Component{
    constructor(props){
        super(props)
        let state = {
            isLoading:false,
            isInited:false,
            time: Date.now()
        }
        this.state=state
    }
    componentDidMount(){
        this.timer = setInterval(()=> this.setState({time:Date.now()}),1000)
    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }
    render(props,state){
        let time = new Date(state.time).toLocaleTimeString()
        return <span>{ time }</span>
    }

}
