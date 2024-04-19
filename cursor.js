// Code in here will wait for website content to be loaded
$(document).ready(function() {
    // Initially start with no timer or location
    var movement_timeout = null, movement_timout_len = 500;
    var prev_x = null;

    // Triggered when mouse moves
    $(document).on("mousemove", function(e) {
        // Still moving, make sure image does not revert to still
        if (movement_timeout !== null) {
            clearTimeout(movement_timeout);
        }

        // Update image location
        $("#cursor-img").css({left: e.pageX, top: e.pageY});

        // Update image based on direction of movement if not first register of location and not in attack animation
        if (prev_x !== null && $("#cursor-img").attr("src") !== "attack.gif") {
            var x_dist = e.pageX - prev_x;
            
            // Left
            if (x_dist < 0 && $("#cursor-img").attr("src") !== "main-character-walk.gif") {
                $("#cursor-img").attr("src", "main-character-walk.gif");
            }

            // Right
            else if (x_dist > 0 && $("#cursor-img").attr("src") !== "right.gif") {
                $("#cursor-img").attr("src", "right.gif");
            }
        }

        // Update previous position
        prev_x = e.pageX;

        // Set timer that will reset image to still once mouse stops moving
        movement_timeout = setTimeout(() => { $("#cursor-img").attr("src", "hi.gif"); }, movement_timout_len);
    });

    // Determines how long attack animation will be displayed
    var attack_timeout = null, attack_len = 1000;

    $(document).on("click", function(e) {
        // Prevents stop of movement from canceling attack animation
        if (movement_timeout !== null) {
            clearTimeout(movement_timeout);
        }

        // Begin attack animation if not already in it
        if ($("#cursor-img").attr("src") !== "attack.gif") {
            // Start attack animation
            $("#cursor-img").attr("src", "attack.gif");

            // Set timer that will reset image to still once the attack animation is complete 
            attack_timeout = setTimeout(() => { $("#cursor-img").attr("src", "hi.gif"); }, attack_len);
        }
    })
});
