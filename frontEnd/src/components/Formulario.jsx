const Formulario=()=>{

    

    return (
        <form >           
            <label htmlFor="">Usuario</label>
            <input type="text" name="username" />
            <br />
            <label htmlFor="">Password</label>
            <input type="password" name="password" id="" />
            <br />
            <input type="submit"  value="Iniciar Sesion" />
        </form>
    )

}

export default Formulario