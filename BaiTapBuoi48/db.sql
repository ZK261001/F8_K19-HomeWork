with ranks as (
	select c.id as candidate_id, c.name as candidate_name ,count(cv.candidate_id) as total_cv ,dense_rank() over (order by count(cv.candidate_id) desc) as ranking
	from candidate c
	left join cv  on c.id = cv.candidate_id
	group by c.id , c.name
)
select r.candidate_id as candidate_id , r.candidate_name , r.total_cv, r.ranking 
from ranks r
where r.ranking =1;

with cate_has_highest_job as (
	select c.id as category_id , c.name as category_name , count(j.category_id) as total_job , dense_rank() over (order by count(j.category_id) desc) as ranking
	from category c
	left join job j on c.id = j.category_id 
	group by c.id , c.name
)
select sub_cate.category_id as category_id ,sub_cate.category_name as category_name , sub_cate.total_job as total_job, sub_cate.ranking as ranking 
from cate_has_highest_job sub_cate
where sub_cate.ranking =1 ;


with sub_jobs as (
	select j_a.job_id as job_id , json_agg(json_build_object('candidate_id',c.id,'candidate_name',c.name)) as list_candidate
	from job_application j_a 
	left join candidate c on c.id =j_a.candidate_id 
	group by j_a.job_id
), sub_cate as  (
	select c.id as category_id , c.name as category_name 
	, json_agg(json_build_object('job_id',j.id,'job_title',j.title ,'candidate', sub_jobs.list_candidate)) as list_jobs 
	from category c 
	left join  job j on j.category_id = c.id 
	left join  sub_jobs on j.id = sub_jobs.job_id
	group by c.id , c.name
)
select * from sub_cate 