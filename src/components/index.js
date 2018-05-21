import {h,render,Component} from 'preact'

export class ValineComponent extends Component{
    state = {
        loading:false,
        initing:true,
        inited:false,

        comment:{},
        comments:[],

        pageNo:1,
        pageSize:10
    }
    constructor(props){
        super(props)
    }
    componentDidMount(){
        
    }
    componentWillUnmount(){
    }
    render(props,state){
        let time = new Date(state.time).toLocaleTimeString()
        return <div class='v' onClick={this.con}></div>
    }

}
