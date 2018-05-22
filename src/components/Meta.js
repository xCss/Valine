import {h} from 'preact'

export default ({meta,onChange}) => {
    <div class={`vheader item${meta.length}`}>
        {
            meta.map((k)=>{
                {
                    let n = k.split(',')
                }
                <input name={n[0]} onChange={onChange} placeholder={n[1]} class="vnick vinput" type={k[0] == 'mail' ? 'email' : k[0]}/>
            })
        }
    </div>
}