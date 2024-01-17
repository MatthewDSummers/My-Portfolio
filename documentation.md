## Errors

All errors will return appropriate HTTP response codes accompanied by the following JSON error object.

### Example error call

```javascript
$.ajax({
    url:"https://matthewsummers.dev/starry-ocean/characters",
    method: "GET",
    dataType: "json",
    success: function(data){
        console.log("Success", data)
    },
    error: function (xhr, status, error) {

        // GENERIC ERROR RESPONSE 
        console.error("XHR Status:", xhr.status);
        console.error("Status:", status);
        console.error("Error:", error);

        // DETAILED ERROR RESPONSE
        var error_data = JSON.parse(xhr.responseText);
        console.log("Error data:", error_data);
    }
});

call_the_api();
