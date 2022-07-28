const deleteBtn = document.querySelectorAll('.fa-trash')                //   Creates variable that connects delete button to trash function 
const item = document.querySelectorAll('.item span')                    //   Creates variable that connects item field to span
const itemCompleted = document.querySelectorAll('.item span.completed') //   Creates variable that connects item field to span after completion of an item

Array.from(deleteBtn).forEach((element)=>{          //             
    element.addEventListener('click', deleteItem)   //     Function Loop for Deleting an item
})//                                                     

Array.from(item).forEach((element)=>{               //
    element.addEventListener('click', markComplete) //     Function Loop for marking an item complete
})

Array.from(itemCompleted).forEach((element)=>{       //            
    element.addEventListener('click', markUnComplete)//    Function Loop for marking an item incomplete
})

async function deleteItem(){                                    //  Creates an async function to delete an item from the todo list
    const itemText = this.parentNode.childNodes[1].innerText    //  Target variable for DOM modification, selects data from the ui
    try{                                                        //  Async syntax
        const response = await fetch('deleteItem', {            //  Create target for response from the DB
            method: 'delete',                                   //  Method used on function (delete method)
            headers: {'Content-Type': 'application/json'},      //  Tell app what content type to change
            body: JSON.stringify({                              //  Turn the answer into a string
              'itemFromJS': itemText                            //  Update the DOM with the updated info
            })                                                  //
          })                                                    //
        const data = await response.json()                      //  Wait for a response from the server
        console.log(data)                                       //  Alert the user what was returned
        location.reload()                                       //  Refresh the DOM

    }catch(err){                                                //
        console.log(err)                                        //   In the event of errors, alert the user
    }                                                           //
}                                                               //

async function markComplete(){                                  //  Creates async function to mark an item complete
    const itemText = this.parentNode.childNodes[1].innerText    //  Target variable for DOM modification, selects data from the ui
    try{                                                        //  Async syntax
        const response = await fetch('markComplete', {          //  Wait for response from DB
            method: 'put',                                      //  Method used
            headers: {'Content-Type': 'application/json'},      //  Tools for the  digital environment
            body: JSON.stringify({                              //  Type of response
                'itemFromJS': itemText                          //  Update DOM
            })                                                  //
          })                                                    //
        const data = await response.json()                      //  Set variable with DB response
        console.log(data)                                       //  Alert the user
        location.reload()                                       //  Reload the DOM
        
    }catch(err){                                                //
        console.log(err)                                        //  In the event of an error, alert the user
    }                                                           //
}                                                               //

async function markUnComplete(){                                //  Creates async function to mark an item incomplete
    const itemText = this.parentNode.childNodes[1].innerText    //  Target variable for DOM modification, selects data from the ui
    try{                                                        //  Async syntax
        const response = await fetch('markUnComplete', {        //  Wait for response from DB
            method: 'put',                                      //  Method used
            headers: {'Content-Type': 'application/json'},      //  Tools for the  digital environment
            body: JSON.stringify({                              //  Type of response
                'itemFromJS': itemText                          //  Update DOM
            })                                                  //
          })                                                    //
        const data = await response.json()                      //  Set variable with DB response
        console.log(data)                                       //  Alert the user
        location.reload()                                       //  Reload the DOM

    }catch(err){                                                //
        console.log(err)                                        //  In the event of an error, alert the user
    }                                                           //
}
