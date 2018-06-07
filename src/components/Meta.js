import {h} from 'preact'

export default ({meta,onInput}) => {
    let content = []
    meta.map((m)=>{
        let n = m.split('_')
        content.push(
            <input name={n[0]} onInput={onInput} placeholder={n[1]} class="vnick vinput" type={n[0] == 'mail' ? 'email' : 'text'}/>
        )
    })
    return (
        <div class={`vheader item${meta.length}`}>
            { content }
        </div>
    )
}