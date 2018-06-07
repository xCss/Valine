import {h,Component} from 'preact'
import Meta from './meta'

export class App extends Component{
    state = {
        loading:false,
        initing:true,
        inited:false,

        comment:{},
        comments:[],

        pageNo:1,
        pageSize:10,
        defaultMeta:['nick_昵称','mail_邮箱','link_网址']
    }
    constructor(props){
        super(props)
        let vCore =new props.vCore(props.options)
        console.log(props.options)
    }

    onInput = (e) => {
        console.log(e)
    }
    componentDidMount(){    }
    componentWillUnmount(){    }
    render(props,state){
        return <div class='v' >
            <Meta meta={state.defaultMeta} onInput={this.onInput}></Meta>
        </div>
    }

}
