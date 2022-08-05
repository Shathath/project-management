import React from 'react';

function CreateTaskModal() 
{
	return <div className="container">
				<div className="row">
					<header className="bold">Create Task</header>
				</div>
				<div className="row input-group mT10">
					<div className="col">
						<input type="text" className="form-control p8" placeholder="Enter your task name" />
					</div>
				</div>
				<div className="row input-group mT10">
					<div className="col-6">
					<select class="form-select form-select-md" aria-label=".form-select-lg example">
						<option selected>All Priority</option>
						<option value="Low"><div className="pmt--low"></div>Low</option>
						<option value="medium"><div className="pmt--low"></div>Medium</option>
						<option value="high"><div className="pmt--low"></div>High</option>
					</select>
					</div>
				</div>
				<div className="row input-group mT10">
					<div className="col">
						<textarea type="text" className="form-control p8" placeholder="Enter your description here"></textarea>
					</div>
				</div>
			</div>
}

export default CreateTaskModal;