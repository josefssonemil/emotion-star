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
  return (
    <div
      style={{ backgroundImage: "url('/img/startscreen-bg.jpg')" }}
      className="h-screen w-full bg-center bg-cover"
    >

      <h1 className="text-6xl p-6">
        Expression Score
      </h1>


      <div className="flex flex-row mx-auto justify-around">

        <div className="w-4/12 bg-red-700">

          <RadarChart performance={data.performance} />


        </div>

        <div className="w-7/12 bg-red-200">

          <div className="flex flex-row bg-red-500">

            <div className="w-2/3 flex flex-col justify-around bg-blue-100">

              <div className="flex flex-row flex-1">

                <div className="w-1/3 p-6 bg-gray-600">
                  <img src="https://raw.githubusercontent.com/julien-gargot/images-placeholder/master/placeholder-portrait.png"></img>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col  p-6">
                    Player One

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

                <div className="w-1/3 p-6 bg-gray-600">
                  <img src="https://raw.githubusercontent.com/julien-gargot/images-placeholder/master/placeholder-portrait.png"></img>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col  p-6">
                    Player One

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


            <div className="w-1/3 flex flex-col justify-between text-right bg-blue-300">
              <div>Team</div>

              <div>Score</div>
            </div>



          </div>



        </div>


      </div>





    </div>
  );
}
