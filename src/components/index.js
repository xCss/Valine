import {h,Component} from 'preact'

export class App extends Component{
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
        let vCore =new props.vCore(props.options)
        console.log(props.options)
    }
    componentDidMount(){    }
    componentWillUnmount(){    }
    render(props,state){
        return <div class='v' ></div>
    }

}
