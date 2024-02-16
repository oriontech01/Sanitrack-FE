import * as React from 'react';
import { Link } from 'react-router-dom';
import './san.css';
import ProgressBar from '../component/ProgressBar';
// import Speedometer from '../component/Speedometer';
import { data } from '../component/Constant';
import SpeedometerValue from '../component/SpeedometerValue';

const CleaningTimer = () => {
  const cleanTime = 96;

  return (
    <div className="div-33">
      <div className="div-41">
        <div className="div-42">Overall System Performance</div>
        <div className="div-43">
          <ProgressBar />
        </div>
      </div>
      <div className="div-45">
        <div className="div-46">
          {data.data.map((item, index) => {
            const { task_actualTime } = item;
            const {
              task_stage,
              assigned_room: { _id }
            } = item.task;

            return (
              <div className="column-3" key={item.task._id}>
                <Link style={{ textDecoration: 'none' }} to={`/dashboard/view-room/${_id}`}>
                  <div className="div-47">
                    <SpeedometerValue cleanTime={cleanTime} />
                    {/* <Speedometer cleanTime={cleanTime} preOpTime={preOpTime} releaseTime={releaseTime} /> */}
                    <div className="div-48">{`Facility ${index + 1}`}</div>
                    <div className="div-49">
                      <div className="div-50">
                        <div className="div-51">
                          <div className="div-52" />
                          <div className="div-53">Clean</div>
                        </div>
                        <div className="div-54">
                          <div className="div-55" />
                          <div className="div-56">Pre-Op</div>
                        </div>
                        <div className="div-57">
                          <div className="div-58" />
                          <div className="div-59">Release</div>
                        </div>
                      </div>
                      <div className="div-60">Planned Time</div>
                      <div className="div-61">
                        <div className="div-62">
                          <div className="div-63">Clean</div>
                          <div className="div-64">Pre-Op</div>
                          <div className="div-65">Release</div>
                          <div className="div-66">Actual Time</div>
                          <div className="div-67">Clean</div>
                          <div className="div-68">Pre-Op</div>
                          <div className="div-69">Release</div>
                        </div>
                        <div className="div-70">
                          <div className="div-71">25:00 Mins</div>
                          <div className="div-72">25:00 Mins</div>
                          <div className="div-73">25:00 Mins</div>
                          <div className="div-74">35:00 Mins</div>
                          <div className="div-75">35:00 Mins</div>
                          <div className="div-76">25:00 Mins</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="column-6">
                    <div className="div-139">
                      <div className="div-140">Grace Iyeh</div>
                      <div className="div-141">Client Contact, Next Item, Next Ite.....</div>
                      <div className="div-142">
                        <img
                          alt=""
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe3d622b5bd936f2a023fbc2a223e744c330598e2acd6499c9c3913b5ca0a49d?"
                          className="img-17"
                        />
                        <img
                          alt=""
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f1b34ffbd3c5f828d8a17a1e4660414999adbb811d9353f62e479d5a2c254c33?"
                          className="img-18"
                        />
                      </div>
                    </div>
                    {/*  */}

                    <div className="column-6">
                      <div className="div-139">
                        <div className="div-140">Grace Iyeh</div>
                        <div className="div-141">Client Contact, Next Item, Next Ite.....</div>
                        <div className="div-142">
                          <img
                            alt=""
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe3d622b5bd936f2a023fbc2a223e744c330598e2acd6499c9c3913b5ca0a49d?"
                            className="img-17"
                          />
                          <img
                            alt=""
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f1b34ffbd3c5f828d8a17a1e4660414999adbb811d9353f62e479d5a2c254c33?"
                            className="img-18"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default CleaningTimer;
