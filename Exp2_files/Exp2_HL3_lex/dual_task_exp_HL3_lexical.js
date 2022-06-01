PennController.ResetPrefix(null);

DebugOff()
      
PennController.Sequence("counter","welcome","consent", "instructions","start_practice","practice_block","startblock1",randomize("experiment"), "exitform");
//"counter","welcome","consent", "instructions","start_practice","practice_block","startblock1",

//"counter","welcome","consent", "instructions","start_practice","practice_block","startblock1",
//randomize("experiment")
SetCounter("counter", "inc", 1);

PennController("welcome",
    newHtml("welcome", "dual_task_welcome_HL3.html")
        .print(),
    newButton("continue_button", "continue")
        .print()
        .wait()
        .remove(),
    getHtml("welcome")
        .remove()
)

//consent & info
PennController("consent",
    newHtml("consent", "dual_task_consent.html")
        .checkboxWarning("Please check the consent box to continue.")
        .center()
        .print(),
    newButton("continue_button", "continue")
        .print()
        .wait(getHtml("consent").test.complete()
            .failure( getHtml("consent").warn()))
        .remove(),
    getHtml("consent")
        .remove()
)

PennController("instructions",
    newHtml("instructions", "dual_task_instructions_HL3.html")
        .print(),
    newButton("continue_button", "Click to begin practice session.")
        .print()
        .wait()
        .remove(),
    fullscreen(),
    getHtml("instructions")
        .remove()
)


newTrial("startblock1",
    newText("space","Well done! You have finished the practice session! You will no longer receive feedback on the memory task. When you are ready, press the SPACEBAR to continue to the experiment.")
    .settings.css("font-size", "x-large")
    .center()
    .print(),
    newKey(" ")
    .wait(),
    getText("space")
    .remove(),
        newText("Ready?", "Ready?")
        .settings.css("font-size", "xxx-large")
        .color("red")
        .center()
        .print(),
    newTimer("time10",1000)
        .start()
        .wait()
        .remove(),
    getText("Ready?")
        .remove()
)

newTrial("start_practice",
    newText("space","<p>When you're ready to begin, you're going to see three letters to store in your memory and you'll have to type them back in at the end of the trial in BACKWARDS order.</p>")
    .settings.css("font-size", "x-large")
    .print(),
    newText("space2", "Press the SPACEBAR to start the four practice trials.")
    .settings.css("font-size", "x-large")
    .print(),
    newKey(" ")
    .wait(),
    getText("space")
    .remove(),
    getText("space2")
    .remove(),
    newText("Ready?", "Ready?")
        .settings.css("font-size", "xxx-large")
        .color("red")
        .center()
        .print(),
    newTimer("time10",1000)
        .start()
        .wait()
        .remove(),
    getText("Ready?")
        .remove()
   
)  


//practice block
Template("dual_task_practice_HL3_lexical.csv", row =>
    newTrial("practice_block",
        newText("3", "+")
            .settings.css("font-size", "xxx-large")
            .color("red")
            .center()
            .print(),
        newTimer("time1",500)
            .start()
            .wait()
            .remove(),
        getText("3")
            .remove(),
        newTimer("time01",500)
            .start()
            .wait()
            .remove(),
        newText("2", "+")
            .settings.css("font-size", "xxx-large")
            .color("red")
            .center()
            .print(),
        newTimer("time2",500)
            .start()
            .wait()
            .remove(),
        getText("2")
            .remove(),
        newTimer("time02",500)
            .start()
            .wait()
            .remove(),
        newText("1", "+")
            .settings.css("font-size", "xxx-large")
            .color("red")
            .center()
            .print(),
        newTimer("time03",500)
            .start()
            .wait()
            .remove(),
        getText("1")
            .remove(),
        newController("DashedSentence", {s: row.seq, mode: "speeded acceptability",
            wordTime : 1000,
            wordPauseTime : 250,
            display: "in place"})
                .settings.css("font-size", "xx-large")
                .center()
                .print()
                .log()
                .wait()
                .remove(),
        newText("3a", "+")
            .settings.css("font-size", "xxx-large")
            .color("red")
            .center()
            .print(),
        newTimer("time4a",500)
            .start()
            .wait()
            .remove(),
        getText("3a")
            .remove(),
        newTimer("time5a",500)
            .start()
            .wait()
            .remove(),
        newText("2a", "+")
            .settings.css("font-size", "xxx-large")
            .color("red")
            .center()
            .print(),
        newTimer("time6a",500)
            .start()
            .wait()
            .remove(),
        getText("2a")
            .remove(),
        newTimer("time7a",500)
            .start()
            .wait()
            .remove(),
        newText("1a", "+")
            .settings.css("font-size", "xxx-large")
            .color("red")
            .center()
            .print(),
        newTimer("time8a",500)
            .start()
            .wait()
            .remove(),
        getText("1a")
            .remove(),
        newText("target_color", row.target_col+".").settings.css("font-size", "x-large"),
        newImage("t1_im","https://raw.githubusercontent.com/kvanvoor/dual_task_exp/master/dice_png/"+row.t1_col+"dice"+row.t1_n+".png"),
        newImage("t2_im","https://raw.githubusercontent.com/kvanvoor/dual_task_exp/master/dice_png/"+row.t2_col+"dice"+row.t2_n+".png"),
        newImage("f1_im","https://raw.githubusercontent.com/kvanvoor/dual_task_exp/master/dice_png/"+row.f1_col+"dice"+row.f1_n+".png"),
        newImage("f2_im","https://raw.githubusercontent.com/kvanvoor/dual_task_exp/master/dice_png/"+row.f2_col+"dice"+row.f2_n+".png"),
        newText("sentence",row.quantifier)
            .center()
            .settings.css("font-size", "x-large")
            .print(),
        newCanvas("dice_canvas", 700 ,400)
            .center()
            .add( row.t1_x, row.t1_y, getImage("t1_im"), 0 ) //top
            .add( row.f1_x, row.f1_y, getImage("f1_im"), 0 ) // right
            .add( row.t2_x, row.t2_y, getImage("t2_im"), 0 ) //bottom
            .add( row.f2_x, row.f2_y, getImage("f2_im"), 0 )
            .print(),
        newTimer(800)
            .start()
            .wait()
            .remove(),
        newCanvas("scale_target", 700, 100)
            .add("center at 50%" , 50, newScale("judgement", 100)
            .slider()
            .before( newText("no", "No") )    // Add a text element to the left
            .after( newText("yes", "Yes")   )
            .log("last"))
            .add("center at 50%" , 0, getText("target_color"))
            .print(),   
        newButton("validate", "validate").center().print().wait(),
        getScale("judgement").test.selected()
            .failure(newText("correct?","You have selected that you agree 50% with the statement above, is this your desired response?").color("red").center().settings.css("font-size",
            "large").print(),
                    getButton("validate").remove(),
                    getButton("yes").remove(),
                    newButton("yes","yes, continue").center().print().wait()),
        getButton("validate")
            .remove(),
        getButton("yes")
            .remove(),
        getText("correct?")
            .remove(),
        getCanvas("dice_canvas")
            .remove(),
        getCanvas("scale_target")
            .remove(),
        getText("sentence")
            .remove(),
        newText("memory_task", "Please enter the letters you saw before but in reverse order of their appearance:")
             .settings.css("font-size", "large"),
        newTextInput("sequence")
            .settings.css("border-radius", "5px")
            .settings.css("border", "solid 1px black")
            .settings.css("font-size", "30px")
            .settings.css("width", "200px")
            .settings.css("height", "70px")
            .settings.css("text-align", "center")
            .settings.css("text-transform", "uppercase")
            .lines(1)
            .length(3)
            .log("final")
            .once(),
        newCanvas("memory_response", 700,200)
            .add("center at 50%", 50, getText("memory_task"))
            .add("center at 50%", 170, newText("capitalization", "(As you will notice, you do not need to captilize or put a space between letters.)"))
            .add("center at 50%", 80, getTextInput("sequence"))
            .print(),
        newText("enter1", "Press ENTER to continue.")
           .settings.css("font-size", "large")
            .center()
            .print(),
        newKey("Enter")
            .wait(),
        getText("enter1")
            .remove(),
        getTextInput("sequence")
            .test.text(row.rep_1)
            .or(getTextInput("sequence").test.text(row.rep_2))
            .or(getTextInput("sequence").test.text(row.rep_3))
            .or(getTextInput("sequence").test.text(row.rep_4))
            .or(getTextInput("sequence").test.text(row.rep_5))
            .or(getTextInput("sequence").test.text(row.rep_6))
            .or(getTextInput("sequence").test.text(row.rep_7))
            .or(getTextInput("sequence").test.text(row.rep_8))
            .failure(newText("incorrect", "Wrong, the correct sequence is "+row.rep_1)
                    .color("red")
                    .bold()
                    .center()
                    .settings.css("font-size", "x-large").print(),
                    newText("hint", "Hint: Other participants found it helpful to start rehearsing the right answer (the letters in reversed order) as soon as the letters are presented.").center().settings.css("font-size", "large").print())
            .success(newText("correct", "Well done!")
                    .color("green")
                    .bold()
                    .center()
                    .settings.css("font-size", "x-large").print()),
        newTimer(800)
                    .start()
                    .wait()
                    .remove(),
        newText("nextsentence", "Are you ready for the next sequence? Hit the SPACEBAR to continue...")
                  .settings.css("font-size", "large")
                  .center()
                  .bold()
                  .settings.css("font-size", "large")
                  .print()
                  .log(),
        newKey(" ")
            .wait(),
        getText("nextsentence")
            .remove(),
        getText("correct")
            .remove(),
        getText("incorrect")
            .remove(),
        getText("hint")
            .remove()
                 
        )
        .log("sequence", row.seq)
        .log("quantifier",row.quantifier)
        .log("target_col",row.target_col)
        .log("filler_col", row.filler_col)
        .log("condition_pic", row.condition_pic)
        .log("t1_n", row.t1_n)
        .log("t2_n", row.t2_n)
        .log("f1_n", row.f1_n)
        .log("f2_n", row.f2_n)
        .log("t1_col", row.t1_col)
        .log("t2_col", row.t2_col)
        .log("f1_col", row.f1_col)
        .log("f2_col", row.f2_col)
        .log("t1_x",row.t1_x)
        .log("t1_y",row.t1_y)
        .log("f1_x",row.f1_x)
        .log("f1_y",row.f1_y)
        .log("t2_x",row.t2_x)
        .log("t2_y",row.t2_y)
        .log("f2_x",row.f2_x)
        .log("f2_y",row.f2_y)
        .log("cognitive_load", "high3")
        .log("numerical_expression", "lexical")
)



//experiment block 1
Template("dual_task_sentence_HL3_lexical.csv", row =>
    newTrial("experiment",
        newText("3", "+")
            .settings.css("font-size", "xxx-large")
            .color("red")
            .center()
            .print(),
        newTimer("time4",500)
            .start()
            .wait()
            .remove(),
        getText("3")
            .remove(),
        newTimer("time5",500)
            .start()
            .wait()
            .remove(),
        newText("2", "+")
            .settings.css("font-size", "xxx-large")
            .color("red")
            .center()
            .print(),
        newTimer("time6",500)
            .start()
            .wait()
            .remove(),
        getText("2")
            .remove(),
        newTimer("time7",500)
            .start()
            .wait()
            .remove(),
        newText("1", "+")
            .settings.css("font-size", "xxx-large")
            .color("red")
            .center()
            .print(),
        newTimer("time8",500)
            .start()
            .wait()
            .remove(),
        getText("1")
            .remove(),
        newController("DashedSentence", {s: row.seq, mode: "speeded acceptability",
            wordTime : 1000,
            wordPauseTime : 250,
            display: "in place"})
                .settings.css("font-size", "xx-large")
                .center()
                .print()
                .log()
                .wait()
                .remove(),
        newText("3a", "+")
            .settings.css("font-size", "xxx-large")
            .color("red")
            .center()
            .print(),
        newTimer("time4a",500)
            .start()
            .wait()
            .remove(),
        getText("3a")
            .remove(),
        newTimer("time5a",500)
            .start()
            .wait()
            .remove(),
        newText("2a", "+")
            .settings.css("font-size", "xxx-large")
            .color("red")
            .center()
            .print(),
        newTimer("time6a",500)
            .start()
            .wait()
            .remove(),
        getText("2a")
            .remove(),
        newTimer("time7a",500)
            .start()
            .wait()
            .remove(),
        newText("1a", "+")
            .settings.css("font-size", "xxx-large")
            .color("red")
            .center()
            .print(),
        newTimer("time8a",500)
            .start()
            .wait()
            .remove(),
        getText("1a")
            .remove(),
        newText("target_color", row.target_col+".").settings.css("font-size", "x-large"),
        newImage("t1_im","https://raw.githubusercontent.com/kvanvoor/dual_task_exp/master/dice_png/"+row.t1_col+"dice"+row.t1_n+".png"),
        newImage("t2_im","https://raw.githubusercontent.com/kvanvoor/dual_task_exp/master/dice_png/"+row.t2_col+"dice"+row.t2_n+".png"),
        newImage("f1_im","https://raw.githubusercontent.com/kvanvoor/dual_task_exp/master/dice_png/"+row.f1_col+"dice"+row.f1_n+".png"),
        newImage("f2_im","https://raw.githubusercontent.com/kvanvoor/dual_task_exp/master/dice_png/"+row.f2_col+"dice"+row.f2_n+".png"),
        newText("sentence",row.quantifier+" dots are ")
            .center()
            .settings.css("font-size", "x-large")
            .print(),
        newCanvas("dice_canvas", 700 ,400)
            .center()
            .add( row.t1_x, row.t1_y, getImage("t1_im"), 0 ) //top
            .add( row.f1_x, row.f1_y, getImage("f1_im"), 0 ) // right
            .add( row.t2_x, row.t2_y, getImage("t2_im"), 0 ) //bottom
            .add( row.f2_x, row.f2_y, getImage("f2_im"), 0 ) // left
            .print(),
        newTimer(800)
            .start()
            .wait()
            .remove(),
        newCanvas("scale_target", 700, 100)
            .add("center at 50%" , 50, newScale("judgement", 100)
            .slider()
            .before( newText("no", "No") )    // Add a text element to the left
            .after( newText("yes", "Yes")   )
            .log("last"))
            .add("center at 50%" , 0, getText("target_color"))
            .print(),
        newButton("Validate", "validate")
            .center()
            .print()
            .wait(),
        getCanvas("dice_canvas")
            .remove(),
        getCanvas("scale_target")
            .remove(),
        getText("sentence")
           .remove(),
        getButton("Validate")
            .remove(),
        newText("memory_task", "Please enter the letters you saw before in reverse order of their appearance:")
            .settings.css("font-size", "large"),
        newTextInput("sequence")
            .settings.css("border-radius", "5px")
            .settings.css("border", "solid 1px black")
            .settings.css("font-size", "30px")
            .settings.css("width", "200px")
            .settings.css("height", "70px")
            .settings.css("text-align", "center")
            .settings.css("text-transform", "uppercase")
            .length(3)
            .log("final")
            .lines(1)
            .once(),
        newCanvas("memory_response", 700,200)
            .add("center at 50%", 50, getText("memory_task"))
            .add("center at 50%", 80, getTextInput("sequence"))
            .print(),
        newText("enter1", "Press ENTER to continue.")
            .center()
            .print(),
        newKey("Enter", "Enter")
            .wait(),
        getText("enter1")
            .remove(),
        newText("sep", "Are you ready for the next sequence? Hit the SPACEBAR to continue...")
            .settings.css("font-size", "large")
            .bold()
            .center()
            .print(),
        newKey(" ")
            .wait(),
        getCanvas("memory_response")
            .remove(),
        getText("enter1")
            .remove(),
        getText("sep")
            .remove()
        )
        .log("group", row.group)
        .log("sequence", row.seq)
        .log("quantifier_category",row.quantifier_category)
        .log("seq_test", row.seq_test)
        .log("overall_condition_pic", row.overall_condition_pic)
        .log("n", row.n)
        .log("distance", row.distance)
        .log("quantifier",row.quantifier)
        .log("target_col",row.target_col)
        .log("filler_col", row.filler_col)
        .log("condition_pic", row.condition_pic)
        .log("t1_n", row.t1_n)
        .log("t2_n", row.t2_n)
        .log("f1_n", row.f1_n)
        .log("f2_n", row.f2_n)
        .log("t1_col", row.t1_col)
        .log("t2_col", row.t2_col)
        .log("f1_col", row.f1_col)
        .log("f2_col", row.f2_col)
        .log("t1_x",row.t1_x)
        .log("t1_y",row.t1_y)
        .log("f1_x",row.f1_x)
        .log("f1_y",row.f1_y)
        .log("t2_x",row.t2_x)
        .log("t2_y",row.t2_y)
        .log("f2_x",row.f2_x)
        .log("f2_y",row.f2_y)
        .log("cognitive_load", "high3")
        .log("numerical_expression", "lexical")
)

newTrial("exitform",  
         newHtml("debrief", "dual_task_debrief.html")
         .log()
         .print()
         .log(),
         newButton("Submit answers")
         .print()
         .wait(),
         getHtml("debrief")
         .remove()
         
        )

