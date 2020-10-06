import RadarChart from "../RadarChart";
/*
  TODO:
  * Insert Grid system
  * 
*/
const data = {
  performance: {
    player1: [70, 50, 70, 80, 50],
    player2: [30, 50, 40, 50, 80],
    average: [60, 60, 60, 60, 60],
  },
};
export default function FinalScreen() {

  const textGlow = {
    textShadow: "0 0 35px rgb(255, 0, 255)"
  };

  const borderGlow = {
    boxShadow: "0 0 rgb(255, 0, 255)"
  };

  return (
    <div
      style={{ backgroundImage: "url('/img/startscreen-bg.jpg')" }}
      className="h-screen w-full bg-center bg-cover"
    >

      <h1 className="text-6xl p-6 text-white"
        style={textGlow}>
        Expression Score
      </h1>


      <div className="flex flex-row mx-auto justify-around">

        <div className="w-4/12 bg-red-700">

          <RadarChart performance={data.performance} />


        </div>

        <div className="w-7/12 " style={borderGlow}>

          <div className="flex flex-row ">

            <div className="w-2/3 flex flex-col justify-around ">

              <div className="flex flex-row flex-1">

                <div className="w-1/3 p-6">
                  <img src="https://raw.githubusercontent.com/julien-gargot/images-placeholder/master/placeholder-portrait.png"></img>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col  p-6">
                    <h1 className="text-3xl">Player One</h1>

                    <div>
                      Item1
                      </div>
                    <div>Item2</div>
                    <div>Item3</div>
                    <div>Item4</div>
                    <div>Item5</div>

                  </div>
                </div>


              </div>
              <div className="flex flex-row flex-1">

                <div className="w-1/3 p-6">
                  <img src="https://raw.githubusercontent.com/julien-gargot/images-placeholder/master/placeholder-portrait.png"></img>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col  p-6">
                    <h1 className="text-3xl">Player Two</h1>

                    <div>
                      Item1
                      </div>
                    <div>Item2</div>
                    <div>Item3</div>
                    <div>Item4</div>
                    <div>Item5</div>

                  </div>
                </div>


              </div>

            </div>


            <div className="w-1/3 flex flex-col justify-between text-right ">
              <h1 className="text-white text-3xl" style={textGlow}>Team: 🌭</h1>

              <h1 className="text-white text-6xl" style={textGlow}>3250p</h1>
            </div>



          </div>



        </div>


      </div>





    </div>
  );
}
